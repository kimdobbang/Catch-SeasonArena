import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "redis";
import { Kafka } from "kafkajs";

// Kafka 클라이언트 생성
const kafka = new Kafka({
  clientId: "game-producer", // 클라이언트 식별자
  brokers: ["3.36.122.163:9092"], // 브로커 주소
});

// Kafka 프로듀서 생성
const producer = kafka.producer();

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
                              startTime : 15723987892ms}>,
                              isEnd : false
                              */
const userRoom = new Map(); // userRoom = <socketId, roomCode>

// 전역변수 관리
const MAP_LENGTH = 5000;
const WEAPON_LENGTH = 100;
const KNOCKBACK_FORCE = 120;
const KNOCKBACK_DURATION = 100; // 100ms

// <<게임방 관리>>
// 방을 생성하거나 기존 방에 플레이어 추가
function joinPlayer(
  roomCode,
  socket,
  nickname,
  profileImage,
  weapon,
  passive,
  skill
) {
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
    kill: 0,
    rating: 500,
    protect: 1,
    skill: skill,
    invincibility: false, // 무적
    visible: false,
  };

  setWeapon(player, weapon);
  setPassive(player, passive);

  if (!rooms.has(roomCode)) {
    setTimeout(() => {
      if (rooms.get(roomCode) && !rooms.get(roomCode).isStarted) {
        rooms.get(roomCode).startTime = Date.now();
        rooms.get(roomCode).magnetic = getMagneticPoint();
        io.in(roomCode).emit("gameStart", rooms.get(roomCode).magnetic);
        console.log(`( 게임 시작 ) ${roomCode}번 방 게임 시작`);
        rooms.get(roomCode).isStarted = true;
      }
    }, 10000);
    const tempRoom = { players: new Map(), isStarted: false, isEnd: false };
    tempRoom.players.set(player.socketId, player);
    rooms.set(roomCode, tempRoom);
    userRoom.set(player.socketId, roomCode); // 유저의 방코드 매핑

    console.log(`( 방 생성 ) 방 번호 : ${roomCode}`);
  } else {
    const room = rooms.get(roomCode);
    room.players.set(player.socketId, player); // 해당 방에 플레이어 추가
    userRoom.set(player.socketId, roomCode); // 유저의 방코드 매핑

    if (room.players.size == 6 && !room.isStarted) {
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

  // 게임방 참여 (나중에 socket.on 지우기, 클라에서도 지우기)
  socket.on("joinRoom", ({ roomCode, nickname, playerData }) => {
    // // 클라이언트에서 보낸 roomCode와 nickname 조회
    // const { roomCode, nickname } = socket.handshake.query;

    // const playerData = getPlayerData(nickname, roomCode);
    if (!playerData) {
      return;
    }

    playerData = Number(playerData);

    console.log("playerData는 " + playerData);
    let profileImage;
    let weapon;
    let passive;
    let skill;

    if ((playerData & (1 << 1)) !== 0) {
      weapon = "1";
    } else if ((playerData & (1 << 5)) !== 0) {
      weapon = "5";
    } else if ((playerData & (1 << 9)) !== 0) {
      weapon = "9";
    }

    if ((playerData & (1 << 2)) !== 0) {
      passive = "2";
    } else if ((playerData & (1 << 6)) !== 0) {
      passive = "6";
    } else if ((playerData & (1 << 10)) !== 0) {
      passive = "10";
    }

    if ((playerData & (1 << 3)) !== 0) {
      skill = "3";
    } else if ((playerData & (1 << 4)) !== 0) {
      skill = "4";
    } else if ((playerData & (1 << 7)) !== 0) {
      skill = "7";
    } else if ((playerData & (1 << 8)) !== 0) {
      skill = "8";
    } else if ((playerData & (1 << 11)) !== 0) {
      skill = "11";
    } else if ((playerData & (1 << 12)) !== 0) {
      skill = "12";
    }

    if ((playerData & (1 << 13)) !== 0) {
      profileImage = "player1";
    } else if ((playerData & (1 << 14)) !== 0) {
      profileImage = "player2";
    } else if ((playerData & (1 << 15)) !== 0) {
      profileImage = "player3";
    } else if ((playerData & (1 << 16)) !== 0) {
      profileImage = "player4";
    }

    console.log(profileImage + weapon + passive + skill);

    socket.join(roomCode);

    joinPlayer(
      roomCode,
      socket,
      nickname,
      profileImage,
      weapon,
      passive,
      skill
    );

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
    const room = rooms.get(roomCode);
    if (!room) {
      console.log(`방을 찾을 수 없습니다: ${roomCode}`);
      return;
    }

    // 방이 존재하고 게임이 끝나지 않은 경우에만 처리
    if (!room.isEnd) {
      const playersMap = getAllPlayers(roomCode);
      const players = Object.fromEntries(playersMap);
      io.in(socket.id).emit("createPlayers", players);
    }
  });

  // <<플레이어 움직임 & 정지 구현>>
  socket.on("playerMovement", (angle) => {
    const player = getPlayer(socket.id);
    if (!player) return;
    if (player && player.canMove) {
      angle = angle * (Math.PI / 180);
      player.velocityX = Math.cos(angle) * player.speed * 5.5;
      player.velocityY = Math.sin(angle) * player.speed * 5.5;
      player.direction = angle;
    }
  });

  socket.on("stopMovement", () => {
    const player = getPlayer(socket.id);
    if (!player) return;
    if (player) {
      player.velocityX = 0;
      player.velocityY = 0;
    }
  });

  // <<플레이어 공격 기능>>
  socket.on("playerAttack", (roomCode) => {
    const players = getAllPlayers(roomCode);
    if (!players) return;
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

  // <<플레이어 스킬 기능>>
  socket.on("playerSkill", (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room) return;
    const attacker = getPlayer(socket.id);
    const skill = attacker.skill;
    if (attacker) {
      // 공격 범위 내 플레이어 감지
      useSkill(room, attacker, skill, roomCode);

      // 모든 클라이언트에게 공격 이벤트 전송
      io.in(roomCode).emit("playerSkilled", {
        attacker: attacker,
      });
    }
  });
});

setInterval(() => {
  rooms.forEach((room, roomCode) => {
    if (room.isEnd) {
      // 20초 뒤에 방 삭제
      setTimeout(() => {
        if (rooms.has(roomCode)) {
          rooms.delete(roomCode);
          console.log(`( 방 삭제 ) ${roomCode} 방이 20초 후에 삭제되었습니다.`);
        }
      }, 20000); // 20초 (20000ms)

      return;
    }

    if (room.isStarted) {
      const playersMap = room.players;

      playersMap.forEach((player, socketId) => {
        // 1명만 남으면 방을 끝내고 사망처리
        if (playersMap.size === 1) {
          room.isEnd = true;
          player.hp = 0;
        }
        // 플레이어 이동 반영
        if (player.canMove) {
          player.x += player.velocityX;
          player.y += player.velocityY;
        }
        player.x = Math.max(80, Math.min(MAP_LENGTH - 80, player.x));
        player.y = Math.max(80, Math.min(MAP_LENGTH - 80, player.y));

        if (player.hp <= 0) {
          const nickname = player.nickname;
          const kill = player.kill;
          const time = Math.round((Date.now() - room.startTime) / 1000);
          const rank = room.players.size;
          const rating = player.rating;

          // 데이터셋을 객체로 만들기
          const result = {
            nickname: nickname,
            kill: kill,
            time: time,
            rank: rank,
            rating: rating,
          };

          sendMessage(result); // 카프카로 전송
          saveResultToRedis(nickname, result); // 레디스에 저장

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
          if (!player.invincibility) {
            player.hp -= damage;
          }
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
  if (!roomCode || !rooms.has(roomCode)) {
    console.log(`( 경고 ) 방을 찾을 수 없습니다. socketId: ${socketId}`);
    return null;
  }
  return rooms.get(roomCode).players.get(socketId);
}

// <<roomCode로 플레이어들을 불러오는 함수>>
function getAllPlayers(roomCode) {
  if (!rooms.has(roomCode)) {
    console.log(`( 경고 ) 방을 찾을 수 없습니다. roomCode: ${roomCode}`);
    return null;
  }
  return rooms.get(roomCode).players;
}

// <<nickname과 roomCode를 키로 레디스에서 데이터 조회>>
async function getPlayerData(nickname, roomCode) {
  try {
    const key = nickname + " " + roomCode;

    // redis에서 데이터 조회
    const playerData = await redisClient.get(key);

    if (playerData) {
      // 문자열을 Buffer로 변환
      const buffer = Buffer.from(redisData, "binary");

      // Big Endian 방식으로 변환 (큰 숫자를 다룰 수 있음)
      const number = buffer.readUIntBE(0, buffer.length);
      return number;
    } else {
      console.log(`해당 키로 조회된 데이터가 없습니다: ${key}`);
      return null;
    }
  } catch (err) {
    console.error(`Redis 조회 중 오류 발생: ${err}`);
    throw err;
  }
}

// <<result 객체를 Redis에 저장하는 함수>>
async function saveResultToRedis(nickname, result) {
  try {
    // HSET 명령을 통해 nickname을 키로 나머지 데이터를 저장
    await redisClient.set(nickname, JSON.stringify(result));
    console.log(`데이터 저장 성공: ${nickname}`);
  } catch (err) {
    console.error(`Redis에 데이터 저장 중 오류 발생: ${err}`);
  }
}

function setWeapon(player, weapon) {
  switch (weapon) {
    case "1": // 메이플 창
      player.reach = 1.3;
      break;
    case "5": // 코스모 완드
      player.knockBack = 2;
      break;
    case "9": // 황금 옥수수
      player.knockBack = 1.5;
      break;
  }
}

function setPassive(player, passive) {
  switch (passive) {
    case "2": // 잭 오 랜턴
      // player.profileImage = 나중에
      player.protect = 0.8;
      break;
    case "6": // 곰
      player.protect = 0.5;
      break;
    case "10": // 다라미
      player.speed = 1.15;
      break;
  }
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
  if (!target.canMove) {
    return;
  }
  const angle = Math.atan2(dy, dx);
  const knockbackX = Math.cos(angle) * KNOCKBACK_FORCE * attacker.knockBack;
  const knockbackY = Math.sin(angle) * KNOCKBACK_FORCE * attacker.knockBack;

  // 타겟에 넉백 적용
  target.velocityX += knockbackX;
  target.velocityY += knockbackY;
  target.x += target.velocityX;
  target.y += target.velocityY;

  target.canMove = false;
  const duration = attacker.weaponImage === "corn" ? 500 : KNOCKBACK_DURATION;
  setTimeout(() => {
    target.velocityX = 0;
    target.velocityY = 0;
    target.canMove = true;
  }, duration);
}

// 체력 감소 및 사망 처리 함수
function applyDamage(attacker, target, roomCode) {
  const damage = 20 * attacker.attackPower;
  if (!target.invincibility) {
    target.hp -= damage * target.protect;
  }
  if (target.hp <= 0) {
    attacker.kill++;
    console.log(
      attacker +
        "kill" +
        target +
        "\n" +
        attacker +
        "의 킬 수 : " +
        attacker.kill
    );
  }
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

// 메시지 전송 함수
async function sendMessage(result) {
  try {
    // 프로듀서 연결
    await producer.connect();

    // 메시지 전송
    await producer.send({
      topic: "game_result",
      messages: [
        {
          key: "game_result",
          value: JSON.stringify(result), // JSON 형식 확인
        },
      ],
    });

    console.log("카프카 메시지가 성공적으로 전송되었습니다.");
  } catch (err) {
    console.error("메시지 전송 중 오류 발생:", err);
  } finally {
    // 프로듀서 연결 종료
    await producer.disconnect();
  }
}

//스킬 사용
function useSkill(room, attacker, skill, roomCode) {
  switch (skill) {
    case "3": // 솔 폭탄
      useBomb(room, attacker);
      break;
    case "4": // 드래곤플라이
      useDragonfly(room, attacker);
      break;
    case "7": // 뚜기 점프
      useJump(room, attacker);
      break;
    case "8": // 버섯
      useMushroom(room, attacker);
      break;
    case "11": // 갤럭시 문
      useGalaxymoon(room, attacker);
      break;
    case "12": // 허수아비
      useScarecrow(room, attacker);
      break;
  }
}

function useBomb(room, attacker) {
  const bombX = attacker.x;
  const bombY = attacker.y;

  setTimeout(() => {
    room.players.forEach((target, socketId) => {
      const dx = target.x - bombX;
      const dy = target.y - bombY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 250 && !target.invincibility) {
        target.hp -= 30 * target.protect;
      }
    });
  }, 3000);
}

function useDragonfly(room, attacker) {
  const magneticRadius = getMagneticRadius(room); // 자기장 반지름 가져오기

  // 드래곤플라이 스킬 사용 시 반지름이 300 미만이면 사용 불가
  if (magneticRadius < 300) {
    console.log(
      `( 드래곤플라이 스킬 실패 ) 자기장 반지름이 너무 작아 스킬을 사용할 수 없습니다.`
    );
    return;
  }

  // 자기장 중심과 반지름 가져오기
  const { x: magneticX, y: magneticY } = room.magnetic;

  // 플레이어를 이동시킬 거리 (자기장 반지름의 80% 정도를 사용하여 여유를 둠)
  const moveRadius = magneticRadius * 0.8;

  // 무작위 각도 선택
  const randomAngle = Math.random() * 2 * Math.PI;

  // 각도를 기반으로 새로운 좌표 계산
  const newPosX = magneticX + moveRadius * Math.cos(randomAngle);
  const newPosY = magneticY + moveRadius * Math.sin(randomAngle);
  attacker.canMove = false;
  // 새로운 위치로 플레이어 이동
  setTimeout(() => {
    attacker.x = newPosX;
    attacker.y = newPosY;
    attacker.canMove = true;
    console.log(
      `( 드래곤플라이 스킬 ) ${attacker.nickname}가 1초 후에 자기장 내의 랜덤 위치로 이동했습니다: (${newPosX}, ${newPosY})`
    );
  }, 1000);
}

function useJump(room, attacker) {}

function useMushroom(room, attacker) {
  const mushroomX = attacker.x;
  const mushroomY = attacker.y;

  room.players.forEach((target, socketId) => {
    if (target.socketId === attacker.socketId) {
      return;
    }
    const dx = target.x - mushroomX;
    const dy = target.y - mushroomY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150 && !target.invincibility) {
      target.hp -= 20 * target.protect;
    }
  });
}

function useGalaxymoon(room, attacker) {
  attacker.visible = true;
  attacker.canMove = false;

  setTimeout(() => {
    attacker.visible = false;
  }, 10000);

  setTimeout(() => {
    attacker.canMove = true;
    room.players.forEach((target, socketId) => {
      if (target.socketId !== attacker.socketId && !target.invincibility) {
        target.hp -= 10;
      }
    });
  }, 2000);
}

function useScarecrow(room, attacker) {
  attacker.invincibility = true;
  attacker.canMove = false;
  setTimeout(() => {
    attacker.invincibility = false;
    attacker.canMove = true;
  }, 3000);
}
