// <<HTTP API 통신>>
function joinRoom(roomCode, playerName, profileImage) {
  ROOMCODE = roomCode;
  socket.emit("joinRoom", { roomCode, playerName, profileImage });
}
function startGame() {
  new Phaser.Game(config); // Phaser 게임 생성
  setTimeout(() => (gameStarted = true), 3000);
}

// <<phaser config>>
const socket = io("https://j11b106.p.ssafy.io");

// <<게임 시작>>
socket.on("gameStart", () => {
  console.log("게임시작");
  startGame();
});

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 800,
  backgroundColor: "#2d2d2d",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
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

let clientPlayers = {};
let clientWeapons = {};

function preload() {
  this.load.image("player1", "./assets/player1.png");
  this.load.image("player2", "./assets/player2.png");
  this.load.image("player3", "./assets/player3.png");
  this.load.image("player4", "./assets/player4.png");
}

function create() {
  const scene = this;
  playerGroup = this.physics.add.group({ collideWorldBounds: true });

  socket.emit("getPlayersInfo", ROOMCODE);

  const MAP_WIDTH = 1000;
  const MAP_HEIGHT = 1000;

  scene.physics.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);

  scene.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);

  this.physics.add.collider(playerGroup, playerGroup, (player1, player2) => {
    // 충돌 후에도 속도를 0으로 설정하여 플레이어가 밀리지 않도록 설정
    player1.setVelocity(0, 0);
    player2.setVelocity(0, 0);

    // 플레이어 간의 위치 조정 없이 서로 충돌한 상태로 유지
  });

  // <<조이스틱>>
  let joystick = this.plugins.get("rexVirtualJoystick").add(this, {
    x: 100,
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
      socket.emit("playerMovement", {
        angle: joystick.angle,
        roomCode: ROOMCODE,
      });
    } else if (gameStarted && joystick.force === 0) {
      socket.emit("stopMovement", { roomCode: ROOMCODE });
    }
  });

  // <<공격 버튼>>
  const attackButton = this.add
    .circle(400, 700, 50, 0xff0000)
    .setInteractive()
    .setScrollFactor(0);

  attackButton.on("pointerdown", () => {
    if (gameStarted) {
      socket.emit("playerAttack");
    }
  });

  // <<플레이어 정보 로드>>
  socket.on("createPlayers", (players) => {
    console.log("플레이어 정보 로드" + JSON.stringify(players, null, 2));
    createPlayer(scene, players);
  });

  // <<60fps로 상태 업데이트 받기>>
  socket.on("stateUpdate", (players) => {
    Object.keys(players).forEach((key) => {
      if (clientPlayers[key]) {
        clientPlayers[key].player.x = players[key].x;
        clientPlayers[key].player.y = players[key].y;

        updateWeapon(
          clientPlayers[key].weapon,
          players[key],
          players[key].direction
        );

        // 닉네임 위치 업데이트
        clientPlayers[key].nickname.setPosition(
          players[key].x,
          players[key].y - 60
        );

        // 체력바 위치 업데이트
        clientPlayers[key].hpBar.clear();
        clientPlayers[key].hpBar.fillStyle(0x00ff00, 1);
        clientPlayers[key].hpBar.fillRect(
          players[key].x - 25,
          players[key].y - 50,
          50 * (players[key].hp / 100),
          5
        ); // 체력 비율에 따라 체력바 길이 조정
      }
    });
  });
}

function update() {}

// ============================================================================ //

function createPlayer(scene, players) {
  Object.keys(players).forEach((key) => {
    let player = players[key];
    clientPlayers[player.socketId] = {};

    // 무기 생성
    const weapon = scene.add.graphics();
    weapon.lineStyle(5, 0xffffff, 1);
    weapon.strokeLineShape(
      new Phaser.Geom.Line(player.x, player.y, player.x + 50, player.y)
    );
    clientPlayers[player.socketId].weapon = weapon;

    // 플레이어 생성
    clientPlayers[player.socketId].player = scene.physics.add
      .image(player.x, player.y, player.profileImage)
      .setScale(0.3);
    clientPlayers[player.socketId].player.setCollideWorldBounds(true);
    clientPlayers[player.socketId].player.setCircle(
      clientPlayers[player.socketId].player.width * 0.3
    ); // 충돌 영역을 원형으로 설정하고 크기 축소
    clientPlayers[player.socketId].player.body.pushable = false; // 다른 객체에 의해 밀리지 않도록 설정
    playerGroup.add(clientPlayers[player.socketId].player);

    // 체력바
    const hpBar = scene.add.graphics();
    const hpBarWidth = 50;
    const hpBarHeight = 5;

    // 체력바 초기 렌더링
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

    if (socket.id === player.socketId) {
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

// <<무기 업데이트 (나중에 무기 이미지 넣을 때 바꿔야 함)>>
function updateWeapon(weapon, player, angle) {
  weapon.clear();

  const batColor = 0x996633; // 야구방망이 색상 (갈색)
  weapon.fillStyle(batColor, 1);

  const offsetDistance = 40; // 플레이어 중심에서 무기가 떨어진 거리
  const adjustedAngle = angle - Math.PI / 2; // 무기 끝점을 -90도 (PI / 2 라디안) 조정

  // 무기의 시작점은 플레이어 위치에서 약간 떨어진 지점
  const startX = player.x + offsetDistance * Math.cos(adjustedAngle);
  const startY = player.y + offsetDistance * Math.sin(adjustedAngle);

  // 야구방망이의 길이와 두께 설정
  const batLength = 60; // 야구방망이의 길이
  const batThicknessStart = 8; // 방망이 손잡이 부분 두께
  const batThicknessEnd = 16; // 방망이 끝부분의 두께

  // 무기 끝점은 시작점에서 각도에 따라 계산
  const endX = startX + batLength * Math.cos(adjustedAngle);
  const endY = startY + batLength * Math.sin(adjustedAngle);

  // 두께가 있는 직사각형을 그리기 위한 회전각도 계산
  const halfThicknessStart = batThicknessStart / 2;
  const halfThicknessEnd = batThicknessEnd / 2;

  // 사각형의 네 꼭짓점을 계산하여 직사각형을 회전시켜서 그리기
  const points = [
    {
      x: startX - halfThicknessStart * Math.sin(adjustedAngle),
      y: startY + halfThicknessStart * Math.cos(adjustedAngle),
    },
    {
      x: endX - halfThicknessEnd * Math.sin(adjustedAngle),
      y: endY + halfThicknessEnd * Math.cos(adjustedAngle),
    },
    {
      x: endX + halfThicknessEnd * Math.sin(adjustedAngle),
      y: endY - halfThicknessEnd * Math.cos(adjustedAngle),
    },
    {
      x: startX + halfThicknessStart * Math.sin(adjustedAngle),
      y: startY - halfThicknessStart * Math.cos(adjustedAngle),
    },
  ];

  // 야구방망이 모양 그리기
  weapon.beginPath();
  weapon.moveTo(points[0].x, points[0].y);
  points.forEach((point, index) => {
    const nextIndex = (index + 1) % points.length;
    weapon.lineTo(points[nextIndex].x, points[nextIndex].y);
  });
  weapon.closePath();
  weapon.fillPath();
}
