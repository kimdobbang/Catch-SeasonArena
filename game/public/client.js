// <<HTTP API 통신>>
function joinRoom(roomCode, nickname, playerData) {
  ROOMCODE = roomCode;
  socket.emit("joinRoom", {
    roomCode,
    nickname,
    playerData,
  });
}

function startGame() {
  new Phaser.Game(config); // Phaser 게임게임 시작
  setTimeout(() => (gameStarted = true), 3000);
}

// // 클라이언트: 쿼리 스트링에서 roomCode와 nickname 추출
// const queryParams = new URLSearchParams(window.location.search);
// const roomCode = queryParams.get('roomcode');
// const nickname = queryParams.get('nickname');

// // Socket.io 클라이언트 초기화 시 roomCode와 nickname을 서버에 전달
// const socket = io('https://j11b106.p.ssafy.io', {
//   query: {
//     roomCode,
//     nickname
//   }
// });

// <<phaser config>>
const socket = io("https://j11b106.p.ssafy.io");
// const socket = io("http://172.30.1.70:3000");
// const socket = io("http://localhost:3000");

// 게임 시작
socket.on("gameStart", (magnetic) => {
  console.log("게임시작");
  MAGNETIC = magnetic;
  startGame();
});

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 800,
  backgroundColor: "#2d2d2d",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  plugins: {
    global: [
      {
        key: "rexVirtualJoystick",
        plugin: rexvirtualjoystickplugin,
        start: true,
      },
    ],
  },
};

// <<전역변수 선언>>
let ROOMCODE;
let gameStarted = false;
let playerGroup;
let clientPlayers = {}; // {player : 페이저 객체, weapon, nickname, hpBar, isAttacking, point : 페이저 객체, visible, galaxymoon, hp:100}
let MAGNETIC = {};
let MAGNETIC_FIELD;
let MAP_LENGTH = 5000;
let MAGNETIC_COUNT = 0;
let lastSkillUsedTime = 0;
let skillCooldown = 10000;
let cooldownText;

function preload() {
  //플레이어
  this.load.image("player1", "./assets/player/player1.png");
  this.load.image("player2", "./assets/player/player2.png");
  this.load.image("player3", "./assets/player/player3.png");
  this.load.image("player4", "./assets/player/player4.png");
  this.load.image("pumpkin", "./assets/player/pumpkin.png");
  //무기
  this.load.image("weapon0", "./assets/weapon/0.png");
  this.load.image("weapon1", "./assets/weapon/1.png");
  this.load.image("weapon5", "./assets/weapon/5.png");
  this.load.image("weapon9", "./assets/weapon/9.png");
  //스킬
  this.load.image("bomb", "./assets/skill/bomb.png");
  this.load.image("scarecrow", "./assets/skill/scarecrow.png");

  this.load.spritesheet("effects1", "./assets/sprite/effects1.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("effects2", "./assets/sprite/effects2.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("effects3", "./assets/sprite/effects3.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  setTimeout(() => {
    // bomb 애니메이션
    this.anims.create({
      key: "3",
      frames: this.anims.generateFrameNumbers("effects1", {
        start: 120,
        end: 124,
      }),
      frameRate: 10,
      repeat: 0,
    });
    // dragonfly 애니메이션
    this.anims.create({
      key: "4",
      frames: this.anims.generateFrameNumbers("effects2", {
        start: 5,
        end: 9,
      }),
      frameRate: 20,
      repeat: 0,
    });
    // jump 애니메이션
    this.anims.create({
      key: "7",
      frames: this.anims.generateFrameNumbers("effects1", {
        start: 175,
        end: 178,
      }),
      frameRate: 10,
      repeat: 0,
    });
    // mushroom 애니메이션
    this.anims.create({
      key: "8",
      frames: this.anims.generateFrameNumbers("effects3", {
        start: 130,
        end: 134,
      }),
      frameRate: 10,
      repeat: 0,
    });
    // galaxymoon 시전 애니메이션
    this.anims.create({
      key: "11-1",
      frames: this.anims.generateFrameNumbers("effects2", {
        start: 80,
        end: 83,
      }),
      frameRate: 10,
      repeat: 4,
    });
    // galaxymoon 피격 애니메이션
    this.anims.create({
      key: "11-2",
      frames: this.anims.generateFrameNumbers("effects2", {
        start: 125,
        end: 129,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }, 2000);
}

function create() {
  const scene = this;
  playerGroup = this.physics.add.group({ collideWorldBounds: true });

  socket.emit("getPlayersInfo", ROOMCODE);

  // 배경 설정
  this.add.rectangle(
    MAP_LENGTH / 2,
    MAP_LENGTH / 2,
    MAP_LENGTH,
    MAP_LENGTH,
    0xff0000
  );

  // 자기장 객체 생성
  MAGNETIC_FIELD = this.add.graphics();

  // 그리드 그리기
  createGrid(this, 50, MAP_LENGTH);

  scene.physics.world.setBounds(0, 0, MAP_LENGTH, MAP_LENGTH); // 월드 경계 설정
  scene.cameras.main.setBounds(0, 0, MAP_LENGTH, MAP_LENGTH); // 카메라 경계 설정

  // 플레이어끼리 충돌 설정
  this.physics.add.collider(playerGroup, playerGroup, (player1, player2) => {
    player1.setVelocity(0, 0); // 충돌 후 속도를 0으로 설정
    player2.setVelocity(0, 0);
  });

  // <<조이스틱>>
  let joystick = this.plugins.get("rexVirtualJoystick").add(this, {
    x: 80,
    y: 700,
    radius: 50,
    base: this.add.circle(0, 0, 50, 0x888888).setOrigin(0.5).setScrollFactor(0),
    thumb: this.add
      .circle(0, 0, 25, 0xcccccc)
      .setOrigin(0.5)
      .setScrollFactor(0),
    dir: "360",
    forceMin: 16,
    fixed: true,
  });

  joystick.on("update", () => {
    const thumb = joystick.thumb;
    const base = joystick.base;
    const maxDistance = joystick.radius - thumb.width / 2;

    const angle = Phaser.Math.DegToRad(joystick.angle);
    const distance = Phaser.Math.Clamp(
      joystick.force * maxDistance,
      0,
      maxDistance
    );

    thumb.x = base.x + distance * Math.cos(angle);
    thumb.y = base.y + distance * Math.sin(angle);

    if (gameStarted && joystick.force > 0) {
      socket.emit("playerMovement", joystick.angle);
    } else if (gameStarted && joystick.force === 0) {
      socket.emit("stopMovement");
    }
  });

  // 멀티터치 가능하게 설정
  this.input.addPointer(1);

  // <<공격 버튼>>
  const attackButton = this.add
    .circle(320, 700, 50, 0xf29627)
    .setInteractive()
    .setScrollFactor(0);

  attackButton.on("pointerdown", () => {
    if (gameStarted && !clientPlayers[socket.id].isAttacking) {
      // 플레이어가 공격할 때 애니메이션 시작
      animateWeaponAttack(
        clientPlayers[socket.id].weapon,
        clientPlayers[socket.id].player,
        clientPlayers[socket.id].player.rotation + Math.PI / 2, // 현재 플레이어의 각도
        clientPlayers[socket.id]
      );
      socket.emit("playerAttack", ROOMCODE);
    }
  });

  // <<스킬 버튼>>
  const skillButton = this.add
    .circle(320, 600, 25, 0x4caf50)
    .setInteractive()
    .setScrollFactor(0);
  cooldownText = this.add
    .text(320, 600, "", { fontSize: "16px", fill: "#ffffff" })
    .setOrigin(0.5)
    .setScrollFactor(0);
  cooldownText.setVisible(false);

  skillButton.on("pointerdown", () => {
    const currentTime = Date.now();

    // 스킬 쿨타임 확인
    if (currentTime - lastSkillUsedTime >= skillCooldown) {
      socket.emit("playerSkill", ROOMCODE);
      lastSkillUsedTime = currentTime;
      skillButton.setAlpha(0.5);
      cooldownText.setText(skillCooldown / 1000);
      cooldownText.setVisible(true);

      // 남은 쿨다운 시간을 갱신하는 함수
      const updateCooldown = setInterval(() => {
        const elapsedTime = Date.now() - lastSkillUsedTime;
        const remainingCooldown = Math.ceil(
          (skillCooldown - elapsedTime) / 1000
        );

        if (remainingCooldown <= 0) {
          cooldownText.setVisible(false);
          skillButton.setAlpha(1);
          clearInterval(updateCooldown); // 업데이트 중지
        } else {
          cooldownText.setText(remainingCooldown);
        }
      }, 1000);
    } else {
      // 스킬 쿨타임 중일 때 아무 동작도 하지 않음
    }
  });

  // <<미니맵 구현>>
  const miniMapWidth = 80;
  const miniMapHeight = 80;
  const miniMap = this.add.graphics();
  miniMap.lineStyle(1, 0x000000);
  miniMap.fillStyle(0xf5deb3);
  miniMap.fillRect(
    this.cameras.main.width - miniMapWidth / 2 - 20 - miniMapWidth / 2,
    20,
    miniMapWidth,
    miniMapHeight
  );
  miniMap.strokeRect(
    this.cameras.main.width - miniMapWidth / 2 - 20 - miniMapWidth / 2,
    20,
    miniMapWidth,
    miniMapHeight
  );
  miniMap.setScrollFactor(0);

  // <<플레이어 정보 로드>>
  socket.on("createPlayers", (players) => {
    console.log("플레이어 정보 로드" + JSON.stringify(players, null, 2));
    createPlayer(scene, players);
  });

  // <<다른 플레이어의 공격 이벤트 받기>>
  socket.on("playerAttacked", ({ attackerId, angle }) => {
    animateWeaponAttack(
      clientPlayers[attackerId].weapon,
      clientPlayers[attackerId].player,
      clientPlayers[attackerId].player.rotation + Math.PI / 2, // 현재 플레이어의 각도
      clientPlayers[attackerId]
    );
  });

  // <<플레이어들의 스킬 이벤트 받기>>
  socket.on("playerSkilled", ({ attacker }) => {
    const player = clientPlayers[attacker.socketId];
    if (player) {
      useSkill(scene, attacker, attacker.skill);
    }
  });

  // <<플레이어 죽음 구현>>
  socket.on("playerDeath", (socketId) => {
    const deadPlayer = clientPlayers[socketId];

    if (deadPlayer) {
      deadPlayer.player.destroy();
      deadPlayer.weapon.destroy();
      deadPlayer.nickname.destroy();
      deadPlayer.hpBar.destroy();
      deadPlayer.point.destroy();

      delete clientPlayers[socketId];
    }

    if (socketId === socket.id) {
      socket.disconnect();
    }
  });

  // <<100fps로 상태 업데이트 받기>>
  socket.on("stateUpdate", ({ players, radius }) => {
    MAGNETIC_COUNT++;
    Object.keys(players).forEach((key) => {
      if (clientPlayers[key]) {
        // 플레이어 위치 업데이트
        clientPlayers[key].player.x = players[key].x;
        clientPlayers[key].player.y = players[key].y;

        // 플레이어가 공격중이 아니면 무기 업데이트
        if (!clientPlayers[key].isAttacking) {
          updateWeapon(
            clientPlayers[key].weapon,
            clientPlayers[key].player,
            players[key].direction,
            false
          );
        }

        // 닉네임 위치 업데이트
        clientPlayers[key].nickname.setPosition(
          players[key].x,
          players[key].y - 60
        );

        //체력 감소 텍스트 애니메이션효과
        if (clientPlayers[key].hp !== players[key].hp) {
          let damage = clientPlayers[key].hp - players[key].hp;
          if (players[key].bear) {
            damage *= 2;
          }
          showDamageText(scene, damage, players[key]);
          clientPlayers[key].hp = players[key].hp;
        }

        // 체력바 위치 업데이트
        clientPlayers[key].hpBar.clear();
        clientPlayers[key].hpBar.fillStyle(0x00ff00, 1);
        clientPlayers[key].hpBar.fillRect(
          players[key].x - 25,
          players[key].y - 50,
          50 * (players[key].hp / 100),
          5
        );

        // 미니맵 업데이트
        clientPlayers[key].point.clear();
        const tempDist = calcDist(
          players[socket.id].x,
          players[socket.id].y,
          players[key].x,
          players[key].y
        );
        if (tempDist < 850 || clientPlayers[socket.id].visible) {
          const pointX = players[key].x / (5000 / 80) + 300;
          const pointY = players[key].y / (5000 / 80) + 20;
          if (tempDist === 0) {
            clientPlayers[key].point.fillStyle(0x00ff00, 1);
          } else {
            clientPlayers[key].point.fillStyle(0xff0000, 1);
          }
          clientPlayers[key].point.fillCircle(pointX, pointY, 2);
        }
      }
    });

    // 자기장 업데이트
    if (MAGNETIC_COUNT % 3 === 0) {
      MAGNETIC_FIELD.clear(); // 이전 그래픽 지우기
      MAGNETIC_FIELD.fillStyle(0xf5deb3);
      MAGNETIC_FIELD.fillCircle(MAGNETIC.x, MAGNETIC.y, radius);
    }
  });
}

function update() {}

// ============================================================================ //

// <<맵 그리드 그리기>>
function createGrid(scene, cellSize, MAP_LENGTH) {
  const graphics = scene.add.graphics();
  graphics.lineStyle(1, 0xaaaaaa, 0.5); // 그리드 선의 스타일 설정 (회색, 투명도 0.5)

  // 수평선 그리기
  for (let y = 0; y <= MAP_LENGTH; y += cellSize) {
    graphics.moveTo(0, y);
    graphics.lineTo(MAP_LENGTH, y);
  }

  // 수직선 그리기
  for (let x = 0; x <= MAP_LENGTH; x += cellSize) {
    graphics.moveTo(x, 0);
    graphics.lineTo(x, MAP_LENGTH);
  }

  graphics.strokePath(); // 그리드 라인을 실제로 그리기
}

// <<플레이어 생성 및 설정>>
function createPlayer(scene, players) {
  Object.keys(players).forEach((key) => {
    let player = players[key];
    clientPlayers[player.socketId] = {};

    // 무기 생성
    const weaponKey = `weapon${player.weaponImage}`;
    const weapon = scene.add
      .image(player.x + 50, player.y, weaponKey)
      .setScale(0.2);
    clientPlayers[player.socketId].weapon = weapon;

    // 플레이어 생성
    let playerSize = 0.3;
    if (player.bear) {
      playerSize = 0.39;
    }
    clientPlayers[player.socketId].player = scene.physics.add
      .image(player.x, player.y, player.profileImage)
      .setScale(playerSize);
    clientPlayers[player.socketId].player.setCollideWorldBounds(true);
    const radius = 120; // 원의 반지름
    clientPlayers[player.socketId].player.setCircle(radius);
    clientPlayers[player.socketId].player.setOffset(radius + 30, radius + 30);
    clientPlayers[player.socketId].player.body.pushable = false;
    playerGroup.add(clientPlayers[player.socketId].player);

    // 체력바 생성
    const hpBar = scene.add.graphics();
    const hpBarWidth = 50;
    const hpBarHeight = 5;
    hpBar.fillStyle(0x00ff00, 1);
    hpBar.fillRect(
      player.x - hpBarWidth / 2,
      player.y - 50,
      hpBarWidth * (player.hp / 100),
      hpBarHeight
    );
    clientPlayers[player.socketId].hpBar = hpBar;

    // 닉네임 텍스트 생성
    const nickname = scene.add
      .text(player.x, player.y - 60, player.nickname, {
        fontSize: "12px",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);
    clientPlayers[player.socketId].nickname = nickname;

    // 자기장 중심점 생성
    const magneticCenterX = MAGNETIC.x / (5000 / 80) + 300;
    const magneticCenterY = MAGNETIC.y / (5000 / 80) + 20;

    const magneticCenter = scene.add.graphics();
    magneticCenter.fillStyle(0x0000ff, 1);
    const size = 5;
    const diamondShape = new Phaser.Geom.Polygon([
      magneticCenterX,
      magneticCenterY - size,
      magneticCenterX + size,
      magneticCenterY,
      magneticCenterX,
      magneticCenterY + size,
      magneticCenterX - size,
      magneticCenterY,
    ]);
    magneticCenter.fillPoints(diamondShape.points, true);
    magneticCenter.setScrollFactor(0);

    // 미니맵 포인트들 생성
    const point = scene.add.graphics();
    const pointX = player.x / (5000 / 80) + 300;
    const pointY = player.y / (5000 / 80) + 20;
    point.fillStyle(0x00ff00, 1);
    point.fillCircle(pointX, pointY, 2);
    point.setScrollFactor(0);
    clientPlayers[player.socketId].point = point;

    // 공격중인지 여부 (초기세팅 false)
    clientPlayers[player.socketId].isAttacking = false;

    // 시야변수 설정 (초기세팅 false)
    clientPlayers[player.socketId].visible = false;

    // 갤럭시문 변수 설정 (초기세팅 false)
    clientPlayers[player.socketId].galaxymoon = false;

    //체력 저장용 (초기세팅 100)
    clientPlayers[player.socketId].hp = 100;

    // 스킬 설정 & 카메라 따라가기 구현
    if (socket.id === player.socketId) {
      setSkill(player.skill);
      console.log("camera follow" + player.socketId);
      scene.cameras.main.startFollow(
        clientPlayers[socket.id].player,
        false,
        1,
        1
      );
    }
  });
}

// 스킬 설정
function setSkill(skill) {
  switch (skill) {
    case "3": // 솔 폭탄
      skillCooldown = 20000;
      break;
    case "4": // 드래곤플라이
      skillCooldown = 30000;
      break;
    case "7": // 뚜기 점프
      skillCooldown = 30000;
      break;
    case "8": // 버섯
      skillCooldown = 20000;
      break;
    case "11": // 갤럭시 문
      skillCooldown = 70000;
      break;
    case "12": // 허수아비
      skillCooldown = 50000;
      break;
  }
}

// <<무기 업데이트>>
function updateWeapon(weapon, player, angle, attack) {
  // 무기의 새로운 위치 계산 (플레이어의 중심에서 50만큼 떨어진 위치)
  weapon.x = player.x + 50 * Math.cos(angle - Math.PI / 2);
  weapon.y = player.y + 50 * Math.sin(angle - Math.PI / 2);

  // 무기를 회전시켜서 플레이어와 함께 회전하는 것처럼 보이게
  weapon.setRotation(angle - Math.PI / 2);

  // 플레이어 회전
  if (!attack) {
    player.setRotation(angle - Math.PI / 2);
  }
}

// <<무기 공격 애니메이션>>
function animateWeaponAttack(weapon, player, initialAngle, clientPlayer) {
  clientPlayer.isAttacking = true; // 공격 시작
  const duration = 300; // 애니메이션 지속 시간 (300ms)
  const startAngle = initialAngle; // 공격 시작 각도
  const endAngle = initialAngle + Math.PI; // 공격 끝 각도

  let currentAngle = startAngle;
  const angleStep = (endAngle - startAngle) / (duration / 16); // 16ms마다 각도 변경

  function animate() {
    // 무기와 플레이어의 회전과 위치 업데이트
    updateWeapon(weapon, player, currentAngle, true);

    // 계속해서 애니메이션 실행
    if (currentAngle < endAngle) {
      currentAngle += angleStep; // 각도를 점진적으로 증가
      setTimeout(animate, 16); // 16ms 후에 다시 실행
    } else {
      // 애니메이션이 끝나면 무기를 원래 상태로 초기화
      updateWeapon(weapon, player, initialAngle, true);
      clientPlayer.isAttacking = false; // 공격 끝
    }
  }

  // 애니메이션 시작
  animate();
}

function calcDist(myX, myY, playerX, playerY) {
  return Math.sqrt(
    (myX - playerX) * (myX - playerX) + (myY - playerY) * (myY - playerY)
  );
}

function useSkill(scene, player, skill) {
  switch (skill) {
    case "3":
      useBomb(scene, player);
      break;
    case "4":
      useDragonfly(scene, player);
      break;
    case "7":
      useJump(scene, player);
      break;
    case "8":
      useMushroom(scene, player);
      break;
    case "11":
      useGalaxymoon(scene, player);
      break;
    case "12":
      useScarecrow(scene, player);
      break;
  }
}

function useBomb(scene, player) {
  const bombX = player.x;
  const bombY = player.y;
  const bomb = scene.add.image(bombX, bombY, "bomb").setScale(0.1);
  setTimeout(() => {
    bomb.destroy();
    const explosion = scene.add.sprite(bombX, bombY, "effects1").setScale(12);
    explosion.play("3");
  }, 3000);
}

function useDragonfly(scene, player) {
  scene.tweens.add({
    targets: clientPlayers[player.socketId].player,
    alpha: 0.5,
    duration: 1000,
    onComplete: () => {
      clientPlayers[player.socketId].player.alpha = 1;
    },
  });
  setTimeout(() => {
    const dragonflyX = player.x;
    const dragonflyY = player.y;
    const portal = scene.add
      .sprite(dragonflyX, dragonflyY, "effects2")
      .setScale(2.5);
    portal.play("4");
    portal.on("animationcomplete", () => {
      portal.destroy();
    });
  }, 500);
}

function useJump(scene, player) {
  clientPlayers[player.socketId].isAttacking = true;
  setTimeout(() => {
    clientPlayers[player.socketId].isAttacking = false;
  }, 500);

  const midX = player.x + 125 * Math.cos(player.direction);
  const midY = player.y + 125 * Math.sin(player.direction);

  // dragonfly 애니메이션 실행
  const dragonfly = scene.add
    .sprite(player.x, player.y, "effects2")
    .setScale(2);
  dragonfly.play("4"); // dragonfly 애니메이션
  dragonfly.on("animationcomplete", () => {
    dragonfly.destroy();
  });

  // 0.5초 후에 jump 애니메이션 실행
  setTimeout(() => {
    const jump = scene.add.sprite(midX, midY, "effects1").setScale(4);
    jump.rotation = player.direction + 90; // 방향에 맞춰 회전
    jump.play("7");
    jump.on("animationcomplete", () => {
      jump.destroy();
    });
  }, 500); // 0.5초 지연 후 실행
}

function useMushroom(scene, player) {
  const mushroomX = player.x;
  const mushroomY = player.y;
  const explosion = scene.add
    .sprite(mushroomX, mushroomY, "effects3")
    .setScale(5);
  explosion.play("8");
}

function useGalaxymoon(scene, player) {
  // 텍스트를 화면 위쪽 중간에 추가
  const galaxymoonText = scene.add.text(
    scene.cameras.main.width / 2, // 화면 가로 중앙
    150,
    "Galaxymoon Launch Detected", // 표시할 텍스트
    {
      font: "20px Arial", // 폰트 설정
      fill: "#ff0000", // 글자 색상
      align: "center", // 가운데 정렬
    }
  );
  galaxymoonText.setOrigin(0.5, 0);
  galaxymoonText.setScrollFactor(0);

  clientPlayers[player.socketId].visible = true;
  setTimeout(() => {
    clientPlayers[player.socketId].visible = false;
  }, 10000);

  // 시전자 애니메이션
  const galaxymoon = scene.add
    .sprite(player.x, player.y, "effects2")
    .setScale(2.5);
  galaxymoon.play("11-1");
  galaxymoon.on("animationcomplete", () => {
    galaxymoon.destroy();
  });

  clientPlayers[player.socketId].isAttacking = true;
  setTimeout(() => {
    clientPlayers[player.socketId].isAttacking = false;
    // 피격자 애니메이션
    clientPlayers[player.socketId].galaxymoon = true;
    Object.values(clientPlayers).forEach((clientPlayer) => {
      if (clientPlayer.galaxymoon) {
        return;
      }
      const galaxymooned = scene.add
        .sprite(clientPlayer.player.x, clientPlayer.player.y - 40, "effects2")
        .setScale(3);
      galaxymooned.play("11-2");
      galaxymooned.on("animationcomplete", () => {
        galaxymooned.destroy();
      });
    });
    clientPlayers[player.socketId].galaxymoon = false;
    galaxymoonText.destroy();
  }, 2000);
}

function useScarecrow(scene, player) {
  const clientPlayer = clientPlayers[player.socketId].player;
  const weapon = clientPlayers[player.socketId].weapon;

  clientPlayer.setAlpha(0);
  weapon.setAlpha(0);
  scene.time.delayedCall(
    3000,
    () => {
      clientPlayer.setAlpha(1);
      weapon.setAlpha(1);
    },
    [],
    scene
  );

  const scarecrow = scene.add
    .image(player.x, player.y, "scarecrow")
    .setScale(0.2);
  setTimeout(() => {
    scarecrow.destroy();
  }, 3000);
}

function showDamageText(scene, damage, player) {
  const damageX = player.x - 20;
  const damageY = player.y - 90;

  const damageText = scene.add.text(damageX, damageY, `-${damage}`, {
    font: "32px Arial",
    fill: "#ff0000",
  });

  scene.tweens.add({
    targets: damageText,
    y: damageY - 50,
    alpha: 0,
    ease: "Power1",
    duration: 1000,
    onComplete: () => {
      damageText.destroy();
    },
  });
}
