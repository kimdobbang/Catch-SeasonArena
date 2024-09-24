import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "redis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use("/game", express.static(path.join(__dirname, "public")));

// redis 설정
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.connect().catch(console.error);

// 방을 관리할 자료구조 (Map)
const rooms = new Map();
/* rooms = <roomCode, room = {players: Map<socketId, player>,
                              isStarted : false,
                              magnetic : {x : ??, y : ??}, 
                              startTime : 15723987892ms}> */
const userRoom = new Map(); // userRoom = <socketId, roomCode>

// 전역변수 관리
const MAP_LENGTH = 5000;
const WEAPON_LENGTH = 100;
const KNOCKBACK_FORCE = 100;
const KNOCKBACK_DURATION = 100; // 100ms

// <<게임방 관리>>
// 방을 생성하거나 기존 방에 플레이어 추가
async function joinPlayer(roomCode, socket, nickname, profileImage) {
  // 플레이어 객체 생성
  const player = {
    socketId: socket.id,
    nickname: nickname,
    profileImage: profileImage,
    weaponImage: "weapon", // 나중에 바꿔야 됨
    x: 100,
    y: 200,
    velocityX: 0,
    velocityY: 0,
    direction: Math.PI / 2, // 라디안
    hp: 100,
    speed: 1,
    attackPower: 1,
    knockBack: 1,
    reach: 1,
    canMove: true,
  };

  // const playerData = await redisClient.get(nickname + " " + roomCode);

  if (!rooms.has(roomCode)) {
    setTimeout(() => {
      if (!rooms.get(roomCode).isStarted) {
        rooms.get(roomCode).startTime = Date.now();
        rooms.get(roomCode).magnetic = getMagneticPoint();
        io.in(roomCode).emit("gameStart", rooms.get(roomCode).magnetic);
        console.log(`( 게임 시작 ) ${roomCode}번 방 게임 시작`);
        rooms.get(roomCode).isStarted = true;
      }
    }, 10000);
    const tempRoom = { players: new Map(), isStarted: false };
    tempRoom.players.set(player.socketId, player);
    rooms.set(roomCode, tempRoom);
    userRoom.set(player.socketId, roomCode); // 유저의 방코드 매핑

    console.log(`( 방 생성 ) 방 번호 : ${roomCode}`);
  } else {
    const room = rooms.get(roomCode);
    room.players.set(player.socketId, player); // 해당 방에 플레이어 추가
    userRoom.set(player.socketId, roomCode); // 유저의 방코드 매핑

    if (room.players.size == 2 && !room.isStarted) {
      rooms.get(roomCode).startTime = Date.now();
      rooms.get(roomCode).magnetic = getMagneticPoint();
      io.in(roomCode).emit("gameStart", room.magnetic);
      room.isStarted = true;
    }
    console.log(
      `( 방 입장 ) 닉네임 : ${player.nickname}, 방 번호 : ${roomCode}`
    );
  }
}

// <<게임>>
io.on("connection", (socket) => {
  console.log(`( 소켓 연결 ) 소켓ID : ${socket.id}`);

  // 게임방 참여
  socket.on("joinRoom", ({ roomCode, nickname, profileImage }) => {
    socket.join(roomCode);
    joinPlayer(roomCode, socket, nickname, profileImage);

    console.log(`( 게임방 참가 ) 소켓ID : ${socket.id}, 방 번호 : ${roomCode}`);
  });

  // 게임 연결 종료
  socket.on("disconnect", () => {
    rooms.forEach((room, roomCode) => {
      room.players.forEach((player, socketId) => {
        if (player.socketId === socket.id) {
          room.players.delete(socketId);
          console.log(
            `( 연결 종료 ) 소켓ID : ${socketId}, 방 코드 : ${roomCode}`
          );
          if (room.players.size === 0) {
            rooms.delete(roomCode);
            console.log(
              `( 방 삭제 ) ${roomCode} 방의 플레이어가 존재하지 않습니다.`
            );
          }
        }
      });
    });
  });

  // <<플레이어 정보요청>>
  socket.on("getPlayersInfo", (roomCode) => {
    const playersMap = getAllPlayers(roomCode);
    const players = Object.fromEntries(playersMap);

    io.in(socket.id).emit("createPlayers", players);
  });

  // <<플레이어 움직임 & 정지 구현>>
  socket.on("playerMovement", (angle) => {
    const player = getPlayer(socket.id);

    if (player && player.canMove) {
      angle = angle * (Math.PI / 180);
      player.velocityX = Math.cos(angle) * player.speed * 5.5;
      player.velocityY = Math.sin(angle) * player.speed * 5.5;
      player.direction = angle;
    }
  });

  socket.on("stopMovement", () => {
    const player = getPlayer(socket.id);

    if (player) {
      player.velocityX = 0;
      player.velocityY = 0;
    }
  });

  // <<플레이어 공격 기능>>
  socket.on("playerAttack", (roomCode) => {
    const players = getAllPlayers(roomCode);
    const attacker = getPlayer(socket.id);
    if (attacker) {
      // 공격 범위 내 플레이어 감지
      checkAttackRange(attacker, players, roomCode);

      // 모든 클라이언트에게 공격 이벤트 전송
      io.in(roomCode).emit("playerAttacked", {
        attackerId: attacker.socketId,
        angle: attacker.direction,
      });
    }
  });
});

setInterval(() => {
  rooms.forEach((room, roomCode) => {
    if (room.isStarted) {
      const playersMap = room.players;

      playersMap.forEach((player, socketId) => {
        // 플레이어 이동 반영
        if (player.canMove) {
          player.x += player.velocityX;
          player.y += player.velocityY;
        }
        player.x = Math.max(80, Math.min(MAP_LENGTH - 80, player.x));
        player.y = Math.max(80, Math.min(MAP_LENGTH - 80, player.y));

        if (player.hp <= 0) {
          getAllPlayers(roomCode).delete(player.socketId);
          io.in(roomCode).emit("playerDeath", player.socketId);
        }
      });

      const players = Object.fromEntries(playersMap);
      const radius = getMagneticRadius(room);

      io.in(roomCode).emit("stateUpdate", { players: players, radius: radius });
    }
  });
}, 16);

setInterval(() => {
  rooms.forEach((room, roomCode) => {
    if (room.isStarted) {
      const playersMap = room.players;

      playersMap.forEach((player, socketId) => {
        // 플레이어 이동 반영
        if (isPlayerInMagnetic(room, player)) {
          const gameTime = Date.now() - room.startTime;
          let damage = 0;
          if (gameTime < 60000) {
            damage = 2;
          } else if (gameTime < 120000) {
            damage = 5;
          } else {
            damage = 10;
          }
          player.hp -= damage;
        }
      });
    }
  });
}, 1000);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000/game");
});

// ============================================================================ //

// <<socket.id로 플레이어를 불러오는 함수>>
function getPlayer(socketId) {
  let roomCode = userRoom.get(socketId);
  return rooms.get(roomCode).players.get(socketId);
}

// <<roomCode로 플레이어들을 불러오는 함수>>
function getAllPlayers(roomCode) {
  return rooms.get(roomCode).players;
}

// <<공격 범위 내의 플레이어들을 감지하는 함수>>
function checkAttackRange(attacker, players, roomCode) {
  const attackerAngle = normalizeAngle(attacker.direction);

  players.forEach((target, socketId) => {
    if (target.socketId !== attacker.socketId) {
      const dx = target.x - attacker.x;
      const dy = target.y - attacker.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= WEAPON_LENGTH * attacker.reach) {
        const angleToTarget = Math.atan2(dy, dx);
        const normalizedAngleToTarget = normalizeAngle(angleToTarget);
        const angleDiff = Math.abs(
          normalizeAngle(attackerAngle - normalizedAngleToTarget)
        );

        if (angleDiff <= Math.PI / 2) {
          applyKnockback(attacker, target, dx, dy); // 타격 효과 적용 (넉백 또는 피해)
          applyDamage(attacker, target, roomCode); // 타격 시 체력 감소
        }
      }
    }
  });
}

// 각도를 -PI ~ PI 범위로 정규화
function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI);
  if (angle > Math.PI) angle -= 2 * Math.PI;
  if (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
}

// 넉백 적용 함수
function applyKnockback(attacker, target, dx, dy) {
  const angle = Math.atan2(dy, dx);
  const knockbackX = Math.cos(angle) * KNOCKBACK_FORCE * attacker.knockBack;
  const knockbackY = Math.sin(angle) * KNOCKBACK_FORCE * attacker.knockBack;

  // 타겟에 넉백 적용
  target.velocityX += knockbackX;
  target.velocityY += knockbackY;
  target.x += target.velocityX;
  target.y += target.velocityY;

  target.canMove = false;

  setTimeout(() => {
    target.velocityX = 0;
    target.velocityY = 0;
    target.canMove = true;
  }, KNOCKBACK_DURATION);
}

// 체력 감소 및 사망 처리 함수
function applyDamage(attacker, target, roomCode) {
  const damage = 20 * attacker.attackPower;
  target.hp -= damage;
}

// 자기장 중앙좌표 반환
function getMagneticPoint() {
  const OFFSET = 500;
  return {
    x: Math.floor(Math.random() * (MAP_LENGTH - 2 * OFFSET)) + OFFSET,
    y: Math.floor(Math.random() * (MAP_LENGTH - 2 * OFFSET)) + OFFSET,
  };
}

function getMagneticRadius(room) {
  const now = Date.now();
  const diff = now - room.startTime;
  const gameTime = 180;

  const magneticLength = getMagneticLength(room);

  return Math.max(0, (1 - diff / (gameTime * 1000)) * magneticLength);
}

function getMagneticLength(room) {
  return (
    Math.sqrt(
      (room.magnetic.x - MAP_LENGTH / 2) * (room.magnetic.x - MAP_LENGTH / 2) +
        (room.magnetic.y - MAP_LENGTH / 2) * (room.magnetic.y - MAP_LENGTH / 2)
    ) +
    MAP_LENGTH / Math.sqrt(2)
  );
}

function isPlayerInMagnetic(room, player) {
  const dist = Math.sqrt(
    (room.magnetic.x - player.x) * (room.magnetic.x - player.x) +
      (room.magnetic.y - player.y) * (room.magnetic.y - player.y)
  );
  const magneticRadius = getMagneticRadius(room);

  return dist > magneticRadius;
}
