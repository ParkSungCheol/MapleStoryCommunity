    console.log("입장");
    var config = {
      //맵설정
      type: Phaser.AUTO,

      scale: {
        width: 1200,
        height: 800,
      },

      //물리엔진 설정 -----
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },

      scene: [Henesis, Market, Ship, Wapponshop, Posionshop],
    };
        
    //phaser3 프레임워크 
    var game = new Phaser.Game(config);
  