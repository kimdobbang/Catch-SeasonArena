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
const socket = io("http://192.168.0.29:3000");

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
      socket.emit("playerMovement", { angle: joystick.angle });
    } else if (gameStarted && joystick.force === 0) {
      socket.emit("stopMovement");
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
}

function update() {}

// ============================================================================ //

function createPlayer(scene, players) {
  Object.keys(players).forEach((key) => {
    let player = players[key];
    // 무기 생성
    const weapon = scene.add.graphics();
    weapon.lineStyle(5, 0xffffff, 1);
    weapon.strokeLineShape(
      new Phaser.Geom.Line(player.x, player.y, player.x + 50, player.y)
    );
    clientWeapons[player.socketId] = weapon;

    // 플레이어 생성
    clientPlayers[player.socketId] = scene.physics.add
      .image(player.x, player.y, player.profileImage)
      .setScale(0.3);
    clientPlayers[player.socketId].setCollideWorldBounds(true);
    clientPlayers[player.socketId].setCircle(
      clientPlayers[player.socketId].width * 0.3
    ); // 충돌 영역을 원형으로 설정하고 크기 축소
    clientPlayers[player.socketId].body.pushable = false; // 다른 객체에 의해 밀리지 않도록 설정
    playerGroup.add(clientPlayers[player.socketId]);

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

    // 닉네임 텍스트 생성
    const nameText = scene.add
      .text(player.x, player.y - 60, player.nickname, {
        fontSize: "12px",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    if (socket.id === player.socketId) {
      scene.cameras.main.startFollow(player, true, 0.05, 0.05);
    }
  });
}
