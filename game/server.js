import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

// <<게임방 관리>>
// 방을 관리할 자료구조 (Map)
// rooms = <roomCode, room = {players: Map<socketId, player>, isStarted : false}> // userRoom = <socketId, roomCode>
const rooms = new Map();
const userRoom = new Map();
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;

// 방을 생성하거나 기존 방에 플레이어 추가
function joinPlayer(roomCode, socket, playerName, profileImage) {
  // 플레이어 객체 생성
  const player = {
    socketId: socket.id,
    nickname: playerName,
    profileImage: profileImage,
    weaponImage: "weapon", // 나중에 바꿔야 됨
    x: 100,
    y: 200,
    velocityX: 0,
    velocityY: 0,
    direction: Math.PI, // 라디안
    hp: 100,
    speed: 1,
    attackPower: 1,
    knockBack: 1,
    reach: 1,
    isAttack: false,
    canMove: true,
  };

  if (!rooms.has(roomCode)) {
    setTimeout(() => {
      if (!rooms.get(roomCode).isStarted) {
        io.in(roomCode).emit("gameStart");
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
      io.in(roomCode).emit("gameStart");
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

  socket.on("joinRoom", ({ roomCode, playerName, profileImage }) => {
    socket.join(roomCode);
    joinPlayer(roomCode, socket, playerName, profileImage);

    console.log(`( 게임방 참가 ) 소켓ID : ${socket.id}, 방 번호 : ${roomCode}`);
  });

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
    const playersMap = rooms.get(roomCode).players;

    const players = Object.fromEntries(playersMap);

    io.in(socket.id).emit("createPlayers", players);
  });

  // <<플레이어 움직임 & 정지 구현>>
  socket.on("playerMovement", ({ angle, roomCode }) => {
    const player = rooms.get(roomCode).players.get(socket.id);

    if (player && player.canMove) {
      angle = angle * (Math.PI / 180);
      player.velocityX = Math.cos(angle) * player.speed * 5.5;
      player.velocityY = Math.sin(angle) * player.speed * 5.5;

      player.direction = angle; // 무기 각도 업데이트
    }
  });

  socket.on("stopMovement", ({ roomCode }) => {
    const player = rooms.get(roomCode).players.get(socket.id);

    if (player) {
      player.velocityX = 0;
      player.velocityY = 0;
    }
  });
});

setInterval(() => {
  rooms.forEach((room, roomCode) => {
    if (room.isStarted) {
      const playersMap = room.players;

      playersMap.forEach((player, key) => {
        if (player.canMove) {
          player.x += player.velocityX;
          player.y += player.velocityY;
        }
        player.x = Math.max(0, Math.min(MAP_WIDTH, player.x));
        player.y = Math.max(0, Math.min(MAP_HEIGHT, player.y));
      });

      const players = Object.fromEntries(playersMap);

      io.in(roomCode).emit("stateUpdate", players);
    }
  });
}, 10);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000/game");
});

// ============================================================================ //
