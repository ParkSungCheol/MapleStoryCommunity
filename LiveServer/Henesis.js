
class Henesis extends Phaser.Scene {
    constructor() {
        console.log("constructor");
        super("hene");
        this.location_x = 1300;
        this.location_y = 500;
        }
    
    // constructor(x, y) {
    //     super("hene");
    //     if(Number.isInteger(x) && Number.isInteger(y)) {
    //         console.log("숫자");
    //         this.location_x = x;
    //         this.location_y = y;
    //     }
    //     else {
    //         this.location_x = 4680;
    //         this.location_y = 500;
    //     }
    // }
   //이미지 로딩 ----------------------------------------
init(data) {
    if(Number.isInteger(data.x) && Number.isInteger(data.y)) {
        console.log("숫자");
        this.location_x = data.x;
        this.location_y = data.y;
    }
}

preload () 
{   
    var url = decodeURIComponent(location.href);
    url = decodeURIComponent(url);
    var params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring( url.indexOf('?')+1, url.length );
    // 파라미터 구분자("&") 로 분리
    params = params.split("&&");
    params[0] = params[0].split("=")[1];
    if(params[1] != null){
        params[1] = params[1].split("=")[1];
    };

    console.log(params[0]); // image
    console.log(params[1]); // uid

    console.log("preload");
    this.load.image('map1', 'assets/루디브리엄메인맵.png');
    this.load.image('ground', 'assets/안보임0.png');
    this.load.spritesheet('potal', 'assets/potal.png',{ frameWidth: 89 , frameHeight: 248  });
    this.load.spritesheet('dude', 'assets/pig.png',{ frameWidth: 88, frameHeight: 65  });

    if(params[0] == 1) {
        this.load.spritesheet('dude1', 'assets/남자캐릭터 스탠드 왼쪽.png',{ frameWidth: 59, frameHeight: 69  });
        this.load.spritesheet('dude2', 'assets/남자캐릭터 스탠드 오른쪽.png',{ frameWidth: 59, frameHeight: 69  });
        this.load.spritesheet('dude3', 'assets/남자캐릭터 걷기 왼쪽.png',{ frameWidth: 70, frameHeight: 66  });
        this.load.spritesheet('dude4', 'assets/남자캐릭터 걷기 오른쪽.png',{ frameWidth: 70, frameHeight: 66  });
        this.load.spritesheet('dude5', 'assets/남자캐릭터 사다리.png',{ frameWidth: 48, frameHeight: 67  });
        this.load.spritesheet('dude6', 'assets/남자캐릭터 앉기.png', { frameWidth: 43, frameHeight: 65  });
        this.load.spritesheet('dude7', 'assets/남자캐릭터 앉기 오른쪽.png', { frameWidth: 43, frameHeight: 65  });
        this.load.spritesheet('dude8', 'assets/남자캐릭터 점프.png', { frameWidth: 56, frameHeight: 64  });
        this.load.spritesheet('dude9', 'assets/남자캐릭터 점프 오른쪽.png', { frameWidth: 56, frameHeight: 64  });
        this.load.spritesheet('dude10', 'assets/남자캐릭터 공격 왼쪽.png', { frameWidth: 96, frameHeight: 71  });
        this.load.spritesheet('dude11', 'assets/남자캐릭터 공격 오른쪽.png', { frameWidth: 96, frameHeight: 71  });
    }
    else if(params[0] == 0) {
        this.load.spritesheet('dude1', 'assets/여자캐릭터 스탠드 왼쪽.png',{ frameWidth: 59, frameHeight: 69  });
        this.load.spritesheet('dude2', 'assets/여자캐릭터 스탠드 오른쪽.png',{ frameWidth: 59, frameHeight: 69  });
        this.load.spritesheet('dude3', 'assets/여자캐릭터 걷기 왼쪽.png',{ frameWidth: 70, frameHeight: 66  });
        this.load.spritesheet('dude4', 'assets/여자캐릭터 걷기 오른쪽.png',{ frameWidth: 70, frameHeight: 66  });
        this.load.spritesheet('dude5', 'assets/여자캐릭터 사다리.png',{ frameWidth: 48, frameHeight: 67  });
        this.load.spritesheet('dude6', 'assets/여자캐릭터 앉기.png', { frameWidth: 43, frameHeight: 62  });
        this.load.spritesheet('dude7', 'assets/여자캐릭터 앉기 오론쪽.png', { frameWidth: 43, frameHeight: 62  });
        this.load.spritesheet('dude8', 'assets/여자캐릭터 점프.png', { frameWidth: 56, frameHeight: 64  });
        this.load.spritesheet('dude9', 'assets/여자캐릭터 점프 오른쪽.png', { frameWidth: 56, frameHeight: 64  });
        this.load.spritesheet('dude10', 'assets/여자캐릭터 공격 왼쪽.png', { frameWidth: 96, frameHeight: 71  });
        this.load.spritesheet('dude11', 'assets/여자캐릭터 공격 오른쪽.png', { frameWidth: 96, frameHeight: 71  });
    }

    this.load.spritesheet('admin1', 'assets/궁수전직.png',{ frameWidth: 78, frameHeight:80});
    this.load.spritesheet('admin2', 'assets/도적전직관.png',{ frameWidth: 87, frameHeight:95});
    this.load.spritesheet('admin3', 'assets/마법사전직.png',{ frameWidth: 77, frameHeight:157});
    this.load.spritesheet('admin4', 'assets/전사전직.png',{ frameWidth: 81, frameHeight:88});
    this.load.spritesheet('admin5', 'assets/해적전직.png',{ frameWidth: 67, frameHeight:82});
    this.load.spritesheet('admin6', 'assets/admin.png',{ frameWidth: 50, frameHeight:81});

    this.load.spritesheet('location1', 'assets/팻말2_커뮤니티.png',{ frameWidth: 178, frameHeight:292});
    this.load.spritesheet('location2', 'assets/팻말2_팬아트.png',{ frameWidth: 178, frameHeight:292});
    this.load.spritesheet('location3', 'assets/팻말2_뉴스.png',{ frameWidth: 178, frameHeight:292});
    this.load.spritesheet('location4', 'assets/팻말2_아이템거래.png',{ frameWidth: 178/2, frameHeight:292/2});
    this.load.spritesheet('location5', 'assets/팻말2_도감.png',{ frameWidth: 178, frameHeight:292});

    this.load.spritesheet('help1', 'assets/방향키_튜토리얼.png',{ frameWidth: 311, frameHeight:78});
    this.load.spritesheet('help2', 'assets/점프npc말걸기_튜토리얼.png',{ frameWidth: 233, frameHeight:77});
    this.load.spritesheet('help3', 'assets/앉기튜토리얼.png',{ frameWidth: 162, frameHeight:189});
    this.load.spritesheet('help4', 'assets/공격하기튜토리얼.png',{ frameWidth: 159, frameHeight:181});
    this.load.spritesheet('help5', 'assets/월드맵튜토리얼.png',{ frameWidth: 194, frameHeight:221});

    this.load.audio("music", "")

}

create (){
    console.log("create");
    this.pause = false;
    this.facing = 'left';
    this.cameras.main.setBounds(1010, -690, 5380, 10000);
    this.key_x_down = 0;

// 이미지 설정 
    this.add.image (3700, 50, 'map1');  //맵 이미지 (가로위치,세로위치,url)
    this.physics.world.setBounds( 1000, -5000, 5420 , 10000);

    // this.platformsG = this.physics.add.staticGroup(); // arcade
    // this.platformsB = this.physics.add.staticGroup();
    // this.platforms = this.physics.add.staticGroup();

    this.platformsG = this.physics.add.staticGroup({
        collideWorldBounds: true
    });

    this.platformsB = this.physics.add.staticGroup({
        collideWorldBounds: true
    });

    this.platforms = this.physics.add.staticGroup({
        collideWorldBounds: false
    });

    // this.platformsG.create(800, 390, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅 
    // this.slope = this.physics.add.sprite(
    //     1000,
    //     400,
    //     "slope"
    //   );
    //   this.slope.setImmovable(true);
    //   this.slope.setOrigin(0);
    // this.platformsG.add(this.slope);
    // this.triangle = new Phaser.Geom.Triangle(
    //     this.slope.x,
    //     this.slope.y + this.slope.height,
    //     this.slope.x + this.slope.width,
    //     this.slope.y,
    //     this.slope.x + this.slope.width,
    //     this.slope.y + this.slope.height
    //   );
    // this.platformsG.create(1150, 390, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅 
    // this.platformsG.create(1300, 390, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅 
    // this.platformsG.create(1385, 390, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅
    // this.platformsG.create(1620, 390, 'ground').setScale(3).setAngle(30); // 가장 밑바닥 땅
    // this.platformsG.create(1645, 440, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅
    // this.platformsG.create(1880, 440, 'ground').setScale(3).setAngle(30); // 가장 밑바닥 땅
    // this.platformsG.create(1825, 500, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅
    // this.platformsG.create(2060, 500, 'ground').setScale(3).setAngle(30); // 가장 밑바닥 땅
    // this.platformsG.create(2200, 560, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅
    for(var j = 1000; j < 6500; j += 1250) {
        this.platformsG.create(j, 590, 'ground').setScale(10).refreshBody(); // 가장 밑바닥 땅 
    }

    this.platformsB.create(5412, 305, 'ground').setScale(1).refreshBody(); // 시계탑 우측 1층
    this.platformsB.create(5458, 125, 'ground').setScale(0.6).refreshBody(); // 시계탑 우측 2층
    this.platformsB.create(5592, -105, 'ground').setScale(2.8).refreshBody(); // 시계탑 우측 3층
    this.platformsB.create(6135, 75, 'ground').setScale(2.8).refreshBody(); // 가장 우측 1층
    this.platformsB.create(6095, 40, 'ground').setScale(0.4).refreshBody(); // 가장 우측 2층
    this.platformsB.create(6110, 20, 'ground').setScale(0.4).refreshBody(); // 가장 우측 3층
    this.platformsB.create(6125, 0, 'ground').setScale(0.4).refreshBody(); // 가장 우측 4층
    this.platformsB.create(1740, 433, 'ground').setScale(0.38).refreshBody(); // 택배자동차 위 오른쪽
    this.platformsB.create(1675, 442, 'ground').setScale(0.1).refreshBody(); // 택배자동차 위 왼쪽
    this.platformsB.create(1768, 255, 'ground').setScale(3.2).refreshBody(); // 택배자동차 위 1층
    this.platformsB.create(3388, 63, 'ground').setScale(0.6).refreshBody(); // 택시표지판 위 3층
    this.platformsB.create(2758, 145, 'ground').setScale(5).refreshBody(); // 택시표지판 위 2층
    this.platformsB.create(2128, 63, 'ground').setScale(0.6).refreshBody(); // 꽃 바로 위 1층
    this.platformsB.create(2077, 520, 'ground').setScale(0.15).refreshBody(); // 꽃집 계단 1층
    this.platformsB.create(2094, 500, 'ground').setScale(0.15).refreshBody(); // 꽃집 계단 2층
    this.platformsB.create(2111, 480, 'ground').setScale(0.15).refreshBody(); // 꽃집 계단 3층
    this.platformsB.create(2128, 460, 'ground').setScale(0.15).refreshBody(); // 꽃집 계단 4층
    this.platformsB.create(2145, 440, 'ground').setScale(0.15).refreshBody(); // 꽃집 계단 5층
    this.platformsB.create(2025, 335, 'ground').setScale(1.1).refreshBody(); // 꽃집 지붕 1층
    this.platformsB.create(2137, 307, 'ground').setScale(0.7).refreshBody(); // 꽃집 지붕 2층
    this.platformsB.create(2250, 523, 'ground').setScale(0.3).refreshBody(); // 꽃집 우측큐브 1층
    this.platformsB.create(2250, 506, 'ground').setScale(0.3).refreshBody(); // 꽃집 우측큐브 2층
    this.platformsB.create(2250, 489, 'ground').setScale(0.3).refreshBody(); // 꽃집 우측큐브 3층
    this.platformsB.create(3015, 510, 'ground').setScale(0.1).refreshBody(); // 프로펠러 1층 좌1
    this.platformsB.create(3105, 510, 'ground').setScale(0.1).refreshBody(); // 프로펠러 1층 좌2
    this.platformsB.create(3015, 481, 'ground').setScale(0.1).refreshBody(); // 프로펠러 2층 좌1
    this.platformsB.create(3105, 481, 'ground').setScale(0.1).refreshBody(); // 프로펠러 2층 좌2
    this.platformsB.create(3015, 452, 'ground').setScale(0.1).refreshBody(); // 프로펠러 3층 좌1
    this.platformsB.create(3105, 452, 'ground').setScale(0.1).refreshBody(); // 프로펠러 3층 좌2
    this.platformsB.create(3135, 422, 'ground').setScale(1.2).refreshBody(); // 프로펠러 4층
    this.platformsB.create(3030, 362, 'ground').setScale(0.05).refreshBody(); // 프로펠러 5층 좌1
    this.platformsB.create(3125, 362, 'ground').setScale(0.05).refreshBody(); // 프로펠러 5층 좌2
    this.platformsB.create(3175, 270, 'ground').setScale(0.2).refreshBody(); // 프로펠러 5층 좌2
    this.platformsB.create(1993, -165, 'ground').setScale(2.8).refreshBody(); // 꽃 바로 위 2층
    this.platformsB.create(3885, 325, 'ground').setScale(4.6).refreshBody(); // 택시표지판 1층
    this.platformsB.create(2847, 303, 'ground').setScale(0.6).refreshBody(); // 파라솔 1층
    this.platformsB.create(3692, 247, 'ground').setScale(0.15).refreshBody(); // 약국 계단 5층
    this.platformsB.create(3682, 258, 'ground').setScale(0.15).refreshBody(); // 약국 계단 4층
    this.platformsB.create(3672, 269, 'ground').setScale(0.15).refreshBody(); // 약국 계단 3층
    this.platformsB.create(3662, 280, 'ground').setScale(0.15).refreshBody(); // 약국 계단 2층
    this.platformsB.create(3652, 291, 'ground').setScale(0.15).refreshBody(); // 약국 계단 1층
    this.platformsB.create(3660, 230, 'ground').setScale(0.05).refreshBody(); // 약국 1층 좌1
    this.platformsB.create(3750, 230, 'ground').setScale(0.15).refreshBody(); // 약국 1층 좌2
    this.platformsB.create(3640, 158, 'ground').setScale(0.02).refreshBody(); // 약국 2층 좌1
    this.platformsB.create(3763, 158, 'ground').setScale(0.02).refreshBody(); // 약국 2층 좌2
    this.platformsB.create(3633, 95, 'ground').setScale(0.07).refreshBody(); // 약국 3층 좌1
    this.platformsB.create(3800, 100, 'ground').setScale(0.5).refreshBody(); // 약국 3층 좌2
    this.platformsB.create(3625, 70, 'ground').setScale(0.1).refreshBody(); // 약국 4층 좌1
    this.platformsB.create(3880, 70, 'ground').setScale(0.2).refreshBody(); // 약국 4층 좌2
    this.platformsB.create(3690, 45, 'ground').setScale(0.3).refreshBody(); // 약국 5층
    this.platformsB.create(3537, 82, 'ground').setScale(0.3).refreshBody(); // 약국 좌측 가로등 1층
    this.platformsB.create(3535, -12, 'ground').setScale(0.05).refreshBody(); // 약국 좌측 가로등 2층
    this.platformsB.create(3970, 35, 'ground').setScale(0.6).refreshBody(); // 약국 우측 공중땅
    this.platformsB.create(4220, 523, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 1층
    this.platformsB.create(4220, 506, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 2층
    this.platformsB.create(4220, 489, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 3층
    this.platformsB.create(4220, 472, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 4층
    this.platformsB.create(4220, 455, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 5층
    this.platformsB.create(4220, 438, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 6층
    this.platformsB.create(4220, 421, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 7층
    this.platformsB.create(4220, 404, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 8층
    this.platformsB.create(4220, 387, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 9층
    this.platformsB.create(4220, 370, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 10층
    this.platformsB.create(4220, 353, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 11층
    this.platformsB.create(4220, 336, 'ground').setScale(0.3).refreshBody(); // 시계탑 좌측 큐브 12층
    this.platformsB.create(4090, 243, 'ground').setScale(0.1).refreshBody(); // 무기상점 1층
    this.platformsB.create(4070, 140, 'ground').setScale(0.01).refreshBody(); // 무기상점 2층 좌1
    this.platformsB.create(4145, 140, 'ground').setScale(0.01).refreshBody(); // 무기상점 2층 좌1
    this.platformsB.create(4680, 460, 'ground').setScale(0.1).refreshBody(); // 시계탑 아래 좌측 미끄럼틀
    this.platformsB.create(4590, 485, 'ground').setScale(0.2).refreshBody(); // 시계탑 아래 좌측 1층 좌1
    this.platformsB.create(4590, 430, 'ground').setScale(0.2).refreshBody(); // 시계탑 아래 좌측 2층 좌1
    this.platformsB.create(4565, 387, 'ground').setScale(0.4).refreshBody(); // 시계탑 아래 좌측 3층 좌1
    this.platformsB.create(4505, 322, 'ground').setScale(0.3).refreshBody(); // 시계탑 아래 좌측 4층 좌1
    this.platformsB.create(4760, 485, 'ground').setScale(0.2).refreshBody(); // 시계탑 아래 좌측 1층 좌2
    this.platformsB.create(4760, 430, 'ground').setScale(0.2).refreshBody(); // 시계탑 아래 좌측 2층 좌2
    this.platformsB.create(4910, 387, 'ground').setScale(0.6).refreshBody(); // 시계탑 아래 좌측 3층 좌2
    this.platformsB.create(4845, 340, 'ground').setScale(0.3).refreshBody(); // 시계탑 아래 좌측 4층 좌2
    this.platformsB.create(5200, 520, 'ground').setScale(0.25).refreshBody(); // 시계탑 아래 우측계단 1층
    this.platformsB.create(5177, 500, 'ground').setScale(0.25).refreshBody(); // 시계탑 아래 우측계단 2층
    this.platformsB.create(5154, 480, 'ground').setScale(0.25).refreshBody(); // 시계탑 아래 우측계단 3층
    this.platformsB.create(4990, 440, 'ground').setScale(0.25).refreshBody(); // 시계탑 아래 우측 4층
    this.platformsB.create(5015, 395, 'ground').setScale(0.25).refreshBody(); // 시계탑 아래 우측 5층
    this.platformsB.create(5110, 260, 'ground').setScale(0.7).refreshBody(); // 시계탑 아래 우측 6층
    this.platformsB.create(4575, 260, 'ground').setScale(1).refreshBody(); // 시계탑 위 좌측 1층
    this.platformsB.create(4890, 250, 'ground').setScale(2.8).refreshBody(); // 시계탑 위 좌측 2층
    this.platformsB.create(4470, 127, 'ground').setScale(1.4).refreshBody(); // 시계탑 위 좌측 3층
    this.platformsB.create(4670, 108, 'ground').setScale(0.25).refreshBody(); // 시계탑 위 좌측 4층
    this.platformsB.create(4667, 38, 'ground').setScale(0.05).refreshBody(); // 시계탑 위 좌측 4층
    this.platformsB.create(5027, 157, 'ground').setScale(0.7).refreshBody(); // 시계탑 위 우측 1층
    this.platformsB.create(4945, 108, 'ground').setScale(0.3).refreshBody(); // 시계탑 위 우측 2층
    this.platformsB.create(5040, 40, 'ground').setScale(0.5).refreshBody(); // 시계탑 위 우측 3층
    this.platformsB.create(4830, -30, 'ground').setScale(0.003).refreshBody(); // 시계탑 위 가운데 시침
    this.platformsB.create(4790, -100, 'ground').setScale(0.1).refreshBody(); // 시계탑 위 시침 위 1층 좌1
    this.platformsB.create(4900, -100, 'ground').setScale(0.2).refreshBody(); // 시계탑 위 시침 위 1층 좌2
    this.platformsB.create(4880, -167, 'ground').setScale(0.5).refreshBody(); // 시계탑 위 시침 위 2층
    this.platformsB.create(4890, -250, 'ground').setScale(2.4).refreshBody(); // 시계탑 위 시침 위 3층
    this.platformsB.create(4890, -250, 'ground').setScale(2.4).refreshBody(); // 시계탑 위 시침 위 3층
    this.platformsB.create(4693, -278, 'ground').setScale(0.34).refreshBody(); // 시계탑 위 시침 위 3층 좌 1층
    this.platformsB.create(4693, -348, 'ground').setScale(0.35).refreshBody(); // 시계탑 위 시침 위 3층 좌 2층
    this.platformsB.create(4978, -270, 'ground').setScale(0.05).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 1층
    this.platformsB.create(4969, -280, 'ground').setScale(0.05).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 2층
    this.platformsB.create(4960, -290, 'ground').setScale(0.05).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 3층
    this.platformsB.create(4951, -300, 'ground').setScale(0.05).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 4층
    this.platformsB.create(4942, -310, 'ground').setScale(0.05).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 5층
    this.platformsB.create(4905, -328, 'ground').setScale(0.5).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 위 1층
    this.platformsB.create(4867, -347, 'ground').setScale(0.15).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 위 2층
    this.platformsB.create(4815, -370, 'ground').setScale(0.08).refreshBody(); // 시계탑 위 시침 위 3층 중앙계단 위 3층


    
    this.player = this.physics.add.sprite(this.location_x, this.location_y, 'dude1'); //캐릭터 
    this.potal1 = this.physics.add.sprite(5034, -380,'potal').setImmovable(); //포탈 -setImmovable() -> 충돌에도 움직이지 않음 
    this.potal2 = this.physics.add.sprite(4700, 335,'potal').setImmovable();
    this.potal3 = this.physics.add.sprite(2470, 415,'potal').setImmovable();
    this.potal4 = this.physics.add.sprite(4103, 117,'potal').setImmovable();
    this.potal5 = this.physics.add.sprite(3703, 122,'potal').setImmovable();
    this.potal6 = this.physics.add.sprite(5669, -245,'potal').setImmovable();
    //this.admin = this.physics.add.sprite(300,400, 'admin').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드   
    this.admin1 = this.physics.add.sprite(5060, 0, 'admin1').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드 
    this.admin2 = this.physics.add.sprite(4680, -395, 'admin2').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드  
    this.admin3 = this.physics.add.sprite(4490, 170, 'admin3').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드  
    this.admin4 = this.physics.add.sprite(5145, 435, 'admin4').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드 
    this.admin5 = this.physics.add.sprite(4880, 195, 'admin5').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드
    this.admin6 = this.physics.add.sprite(5820, 500, 'admin6').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드

    this.location1 = this.physics.add.sprite(3806, 235,'location1').setImmovable();
    this.location2 = this.physics.add.sprite(4200, 235,'location2').setImmovable();
    this.location3 = this.physics.add.sprite(5780, -185,'location3').setImmovable();
    this.location4 = this.physics.add.sprite(2610, 474,'location4').setImmovable();
    this.location5 = this.physics.add.sprite(5730, 467,'location5').setImmovable();

    this.help1 = this.physics.add.sprite(1300, 580,'help1').setImmovable();
    this.help2 = this.physics.add.sprite(1700, 580,'help2').setImmovable();
    this.help3 = this.physics.add.sprite(2740, 380,'help3').setImmovable();
    this.help4 = this.physics.add.sprite(4000, 382,'help4').setImmovable();
    this.help5 = this.physics.add.sprite(4450, -50,'help5').setImmovable();

    this.dude = this.physics.add.sprite(4000, 508,'dude').setImmovable();
    
    //메인캐릭터 설정--------------------
    this.player.depth = 100; //캐릭터 레이어를 앞으로 설정
    this.player.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
    this.player.setCollideWorldBounds(true); //맵 밖으로 안나가게 
    this.player.body.setGravityY(1000) //캐릭터 중력설정
    this.player.setScale(1,1); // 크기 설정
    this.physics.add.collider(this.player, this.platformsG); //ground블럭과 충돌여부 
    //this.player.body.setCircle(30);

    

    
    this.colliderB = this.physics.add.collider(this.player, this.platformsB);

     
    //포탈 오브젝트 설정--------------------
    this.potal1.body.setGravityY(-300) //포탈 중력설정

    this.potal2.body.setGravityY(-300) //포탈 중력설정

    this.potal3.body.setGravityY(-300) //포탈 중력설정
 
    this.potal4.body.setGravityY(-300) //포탈 중력설정
  
    this.potal5.body.setGravityY(-300) //포탈 중력설정

    this.potal6.body.setGravityY(-300) //포탈 중력설정


    this.location1.body.setGravityY(-300) //팻말 중력설정
    this.location2.body.setGravityY(-300) //팻말 중력설정
    this.location3.body.setGravityY(-300) //팻말 중력설정
    this.location4.body.setGravityY(-300) //팻말 중력설정
    this.location5.body.setGravityY(-300) //팻말 중력설정

    this.help1.body.setGravityY(-300) //도움말 중력설정
    this.help2.body.setGravityY(-300) //도움말 중력설정
    this.help3.body.setGravityY(-300) //도움말 중력설정
    this.help4.body.setGravityY(-300) //도움말 중력설정
    this.help5.body.setGravityY(-300) //도움말 중력설정

    this.dude.body.setGravityY(-300) //포탈 중력설정
   
     //운영자 캐릭터 설정-------------------
    // this.admin.body.setGravityY(300) //운영자 중력설정
    // this.physics.add.collider(this.admin, this.platforms); //ground블럭과 충돌여부 
    // this.admin.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
    // this.admin.setCollideWorldBounds(true); //맵 밖으로 안나가게 
 
      //운영자 움직임--------------
    // this.anims.create({ 
    //     key: 'admin',
    //     frames: this.anims.generateFrameNumbers('admin',{start:0,end:3}), //프레임 선택  
    //     frameRate: 4, //프레임 재생속도
    //     repeat: -1 //반복
    //         }
    //     );

        this.admin1.body.setGravityY(-300) //운영자 중력설정
         this.physics.add.collider(this.admin1, this.platformsG); //ground블럭과 충돌여부 
         this.physics.add.collider(this.admin1, this.platformsB); //ground블럭과 충돌여부 
         this.admin1.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
         this.admin1.setCollideWorldBounds(true); //맵 밖으로 안나가게 
     
          //운영자 움직임--------------
        this.anims.create({ 
            key: 'admin1',
            frames: this.anims.generateFrameNumbers('admin1',{start:0,end:2}), //프레임 선택  
            frameRate: 5, //프레임 재생속도
            repeat: -1 //반복
                }
            );

        this.admin1.anims.play('admin1',true); //운영자 스프라이트 움직임 실행

        this.admin2.body.setGravityY(-300) //운영자 중력설정
        this.physics.add.collider(this.admin2, this.platformsG); //ground블럭과 충돌여부 
        this.physics.add.collider(this.admin2, this.platformsB); //ground블럭과 충돌여부 
        this.admin2.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
        this.admin2.setCollideWorldBounds(true); //맵 밖으로 안나가게 
    
         //운영자 움직임--------------
       this.anims.create({ 
           key: 'admin2',
           frames: [ { key: 'admin2', frame: 0 } ], //재생할 프레임 선택
               }
           );

       this.admin2.anims.play('admin2',true); //운영자 스프라이트 움직임 실행

       this.admin3.body.setGravityY(-300) //운영자 중력설정
        this.physics.add.collider(this.admin3, this.platformsG); //ground블럭과 충돌여부 
        this.physics.add.collider(this.admin3, this.platformsB); //ground블럭과 충돌여부 
        this.admin3.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
        this.admin3.setCollideWorldBounds(true); //맵 밖으로 안나가게 
    
         //운영자 움직임--------------
       this.anims.create({ 
           key: 'admin3',
           frames: this.anims.generateFrameNumbers('admin3',{start:0,end:3}), //프레임 선택  
            frameRate: 5, //프레임 재생속도
            repeat: -1 //반복
               }
           );

       this.admin3.anims.play('admin3',true); //운영자 스프라이트 움직임 실행

       this.admin4.body.setGravityY(-300) //운영자 중력설정
       this.physics.add.collider(this.admin4, this.platformsG); //ground블럭과 충돌여부 
       this.physics.add.collider(this.admin4, this.platformsB); //ground블럭과 충돌여부 
       this.admin4.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
       this.admin4.setCollideWorldBounds(true); //맵 밖으로 안나가게 
   
        //운영자 움직임--------------
      this.anims.create({ 
          key: 'admin4',
          frames: [ { key: 'admin4', frame: 0 } ], //재생할 프레임 선택
              }
          );

      this.admin4.anims.play('admin4',true); //운영자 스프라이트 움직임 실행

      this.admin5.body.setGravityY(-300) //운영자 중력설정
       this.physics.add.collider(this.admin5, this.platformsG); //ground블럭과 충돌여부 
       this.physics.add.collider(this.admin5, this.platformsB); //ground블럭과 충돌여부 
       this.admin5.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
       this.admin5.setCollideWorldBounds(true); //맵 밖으로 안나가게 
   
        //운영자 움직임--------------
      this.anims.create({ 
          key: 'admin5',
          frames: this.anims.generateFrameNumbers('admin5',{start:0,end:2}), //프레임 선택  
            frameRate: 5, //프레임 재생속도
            repeat: -1 //반복
              }
          );

      this.admin5.anims.play('admin5',true); //운영자 스프라이트 움직임 실행

      this.admin6.body.setGravityY(-300) //운영자 중력설정
       this.physics.add.collider(this.admin6, this.platformsG); //ground블럭과 충돌여부 
       this.physics.add.collider(this.admin6, this.platformsB); //ground블럭과 충돌여부 
       this.admin6.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
       this.admin6.setCollideWorldBounds(true); //맵 밖으로 안나가게 
   
        //운영자 움직임--------------
      this.anims.create({ 
          key: 'admin6',
          frames: this.anims.generateFrameNumbers('admin6',{start:0,end:3}), //프레임 선택  
            frameRate: 5, //프레임 재생속도
            repeat: -1 //반복
              }
          );

      this.admin6.anims.play('admin6',true); //운영자 스프라이트 움직임 실행


          //포탈 움직임---------------
    this.anims.create({ 
         key: 'potal',
         frames: this.anims.generateFrameNumbers('potal', { start: 0, end: 7 }), //프레임 선택 
         frameRate: 13, //프레임 재생속도
         repeat: -1  //반복
         });

    //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
             this.potal1.anims.play('potal',true); //포탈 스프라이트 움직임 실행
             this.potal2.anims.play('potal',true); //포탈 스프라이트 움직임 실행
             this.potal3.anims.play('potal',true);
             this.potal4.anims.play('potal',true);
             this.potal5.anims.play('potal',true);
             this.potal6.anims.play('potal',true);


             this.anims.create({ 
                key: 'location1',
                frames: [ { key: 'location1', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.location1.anims.play('location1',true); //포탈 스프라이트 움직임 실행
            this.anims.create({ 
                key: 'location2',
                frames: [ { key: 'location2', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.location2.anims.play('location2',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'location3',
                frames: [ { key: 'location3', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.location3.anims.play('location3',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'location4',
                frames: [ { key: 'location4', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.location4.anims.play('location4',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'location5',
                frames: [ { key: 'location5', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.location5.anims.play('location5',true); //포탈 스프라이트 움직임 실행

            //메인 캐릭터 움직임--------------------------------------------

            this.anims.create({ 
                key: 'help1',
                frames: [ { key: 'help1', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.help1.anims.play('help1',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'help2',
                frames: [ { key: 'help2', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.help2.anims.play('help2',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'help3',
                frames: [ { key: 'help3', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.help3.anims.play('help3',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'help4',
                frames: [ { key: 'help4', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.help4.anims.play('help4',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'help5',
                frames: [ { key: 'help5', frame: 0 } ], //재생할 프레임 선택
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
            this.help5.anims.play('help5',true); //포탈 스프라이트 움직임 실행

            this.anims.create({ 
                key: 'dude',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }), //프레임 선택 
                frameRate: 13, //프레임 재생속도
                repeat: -1  //반복
                });
       
           //         this.admin.anims.play('admin',true); //운영자 스프라이트 움직임 실행
                    this.dude.anims.play('dude',true); //포탈 스프라이트 움직임 실행


 //왼쪽으로
this.anims.create({
    key: 'left', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude3', { start: 0, end: 3 }), //재생할 프레임 선택 
    frameRate: 5, //프레임 재생속도
    repeat: -1 //반복
});


//오른쪽으로 
this.anims.create({ 
    key: 'right', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude4', { start: 0, end:3  }), //재생할 프레임 선택 
    frameRate: 5, //프레임 재생속도
    repeat: -1 //반복
});


//정지 왼쪽방향 
this.anims.create({ 
    key: 'stop', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude1', { start: 0, end:2  }), //재생할 프레임 선택 
    frameRate: 3, //프레임 재생속도
    repeat: -1 //반복
});


//정지 오른쪽방향 
this.anims.create({ 
    key: 'stopright', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude2', { start: 0, end:2  }), //재생할 프레임 선택 
    frameRate: 3, //프레임 재생속도
    repeat: -1 //반복
    
});

this.anims.create({ 
    key: 'up', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude5', { start: 0, end:1  }), //재생할 프레임 선택 
    frameRate: 3, //프레임 재생속도
    repeat: -1 //반복
    
});

this.anims.create({ 
    key: 'down', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude5', { start: 0, end:1  }), //재생할 프레임 선택 
    frameRate: 3, //프레임 재생속도
    repeat: -1 //반복
    
});

this.anims.create({ 
    key: 'left_attack', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude10', { start: 0, end:2  }), //재생할 프레임 선택 
    frameRate: 5, //프레임 재생속도
    repeat: -1 //반복
    
});

this.anims.create({ 
    key: 'right_attack', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude11', { start: 0, end:2  }), //재생할 프레임 선택 
    frameRate: 5, //프레임 재생속도
    repeat: -1 //반복
    
});

this.anims.create({ 
    key: 'left_jump', //key값 설정 
    frames: [ { key: 'dude8', frame: 0 } ], //재생할 프레임 선택
    
});

this.anims.create({ 
    key: 'right_jump', //key값 설정 
    frames: [ { key: 'dude9', frame: 0 } ], //재생할 프레임 선택
    
});

this.anims.create({ 
    key: 'left_sit', //key값 설정 
    frames: [ { key: 'dude6', frame: 0 } ], //재생할 프레임 선택
    
});

this.anims.create({ 
    key: 'right_sit', //key값 설정 
    frames: [ { key: 'dude7', frame: 0 } ], //재생할 프레임 선택
    
});

//운영자 클릭시 대화 

this.element1 = document.getElementById('input-box4');
    
    
    //대화 켜기 (캐릭터 선택)
    this.admin1.on('pointerdown',()=>{
        this.pause = true;
        console.log("클릭");
           if(this.element1 && this.element1.style.display === 'none') {
            this.element1.style.display = 'block';
          } 
        })
    
        //끄는 버튼  (대화창 close 버튼)
            document.getElementById('btn4').addEventListener('click',()=>{
                this.pause = false;
          this.element1.style.display = 'none'
        })

        this.element2 = document.getElementById('input-box5');
    
    
    //대화 켜기 (캐릭터 선택)
    this.admin2.on('pointerdown',()=>{
        this.pause = true;
        console.log("클릭");
           if(this.element2 && this.element2.style.display === 'none') {
            this.element2.style.display = 'block';
          } 
        })
    
        //끄는 버튼  (대화창 close 버튼)
            document.getElementById('btn5').addEventListener('click',()=>{
                this.pause = false;
          this.element2.style.display = 'none'
        })

    
        this.element3 = document.getElementById('input-box6');
    
    
    //대화 켜기 (캐릭터 선택)
    this.admin3.on('pointerdown',()=>{
        this.pause = true;
        console.log("클릭");
           if(this.element3 && this.element3.style.display === 'none') {
            this.element3.style.display = 'block';
          } 
        })
    
        //끄는 버튼  (대화창 close 버튼)
            document.getElementById('btn6').addEventListener('click',()=>{
                this.pause = false;
          this.element3.style.display = 'none'
        })

        this.element4 = document.getElementById('input-box7');
    
    
    //대화 켜기 (캐릭터 선택)
    this.admin4.on('pointerdown',()=>{
        this.pause = true;
        console.log("클릭");
           if(this.element4 && this.element4.style.display === 'none') {
            this.element4.style.display = 'block';
          } 
        })
    
        //끄는 버튼  (대화창 close 버튼)
            document.getElementById('btn7').addEventListener('click',()=>{
                this.pause = false;
          this.element4.style.display = 'none'
        })
        
        this.element5 = document.getElementById('input-box8');
    
    
    //대화 켜기 (캐릭터 선택)
    this.admin5.on('pointerdown',()=>{
        this.pause = true;
        console.log("클릭");
           if(this.element5 && this.element5.style.display === 'none') {
            this.element5.style.display = 'block';
          } 
        })
    
        //끄는 버튼  (대화창 close 버튼)
            document.getElementById('btn8').addEventListener('click',()=>{
            this.pause = false;
          this.element5.style.display = 'none'
        })

    this.admin6.on('pointerdown',()=>{
        console.log("클릭");
        let width = 800;
        let height = 600;
        let top = (window.innerHeight - height) / 2 + screenY;
        let left = (window.innerWidth - width) / 2 + screenX;

        let spec = 'status=no, menubar=no, toolbar=no, resizable=no';
        spec += ', width=' + width + ', height=' + height;
        spec += ', top=' + top + ', left=' + left;

        window.open('book.html', 'popup', spec);
    })  
    
  //아래점프시 충돌 설정 다시해줌
  this.timedEvent = this.time.addEvent({ delay: 500, callback: this.onEvent, callbackScope: this, loop: true });
    
// 카메라 설정----------------------------------
this.cameras.main.startFollow(this.player, true, 1, 1);//속도
this.cameras.main.setZoom(1.7); // 줌 배율 
this.cameras.main.setFollowOffset( 0, 120);

}




//반복문으로 움직임 구현 부분 ---------------------------------------------------------
update () {
    this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 입력 변수 선언 및 초기화   createCursorKeys() 메서드엔 up down left light space shift 만 지정되어 있음 
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // alt 키 추가 
    this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL); 
    this.key_x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X); 
    this.key_w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
    
    var player = this.player;

    this.platforms.children.entries.forEach(element => {
        if(element.y < player.y + 30) {
            this.platformsB.remove(element);
            this.platforms.add(element);
        }
        else {
            this.platforms.remove(element);
            this.platformsB.add(element);
        }
    });
    this.platformsB.children.entries.forEach(element => {
        if(element.y < player.y + 30) {
            this.platformsB.remove(element);
            this.platforms.add(element);
        }
        else {
            this.platforms.remove(element);
            this.platformsB.add(element);
        }
    });

//포탈에서 맵이동 구현-----------------
if((this.player.x>=4670 && this.player.x <=4720 && this.player.y <= 427.5 && this.player.y >= 422.5  && this.player.body.touching.down)){ 
    if(this.cursors.up.isDown ){

        console.log("맵");
        this.scene.start('hene', {x: 5034, y: -300});
         
    }
}

if(this.player.x>=5010 && this.player.x <=5060 && this.player.y <= -296 && this.player.y >= -297  && this.player.body.touching.down) {
    if(this.cursors.up.isDown ){

        console.log("맵");
        this.scene.start('hene', {x: 4700, y: 427});
        
    }
}
console.log(this.player.x + " " + this.player.y);
if(this.player.x >= (this.potal3.x-40) && this.player.x <= (this.potal3.x+40) && this.player.y >=(this.potal3.y+30) && this.player.y <=(this.potal3.y+100) && this.player.body.touching.down){ 
    if(this.cursors.up.isDown ){

        console.log("이동");
        this.scene.start('market');
       
    }
}
if(this.player.x >= (this.potal4.x-40) && this.player.x <= (this.potal4.x+40) && this.player.y >=(this.potal4.y+30) && this.player.y <=(this.potal4.y+100) && this.player.body.touching.down){ 
    if(this.cursors.up.isDown ){

        console.log("이동");
        this.scene.start('wappon');
       
    }
}
if(this.player.x >= (this.potal5.x-40) && this.player.x <= (this.potal5.x+40) && this.player.y >=(this.potal5.y+30) && this.player.y <=(this.potal5.y+100) && this.player.body.touching.down){ 
    if(this.cursors.up.isDown ){

        console.log("이동");
        this.scene.start('posion');
       
    }
}
if(this.player.x >= (this.potal6.x-40) && this.player.x <= (this.potal6.x+40) && this.player.y >=(this.potal6.y+30) && this.player.y <=(this.potal6.y+100) && this.player.body.touching.down){ 
    if(this.cursors.up.isDown ){

        console.log("이동");
        this.scene.start('ship');
       
    }
}

if( this.key_x_down == 1) {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if(this.key_x.isDown) {
        this.key_x_down++;
        this.key_x_down %= 2;
    }
    else if(this.facing == 'left')
        this.player.anims.play('left_sit', true);
    else
        this.player.anims.play('right_sit', true);
}
else{
if(!this.player.body.touching.down && this.facing =='left'){
    if(this.player.body.velocity.y > 0) {
        if(this.cursors.right.isDown) {
            this.player.setVelocityX(200); //x축 속도 설정 
            this.facing = 'right';
        }
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-200); //x축 속도 설정 
            this.facing = 'left';
        }
        return;
    }
    this.player.anims.play('left_jump', true);
    if(this.cursors.right.isDown) {
        this.player.setVelocityX(200); //x축 속도 설정 
        this.facing = 'right';
        this.player.anims.play('right_jump', true);
        return;
    }
    if(this.cursors.left.isDown) {
        this.player.setVelocityX(-200); //x축 속도 설정 
        this.facing = 'left';
    }

    }

else if(!this.player.body.touching.down && this.facing =='right') {
    if(this.player.body.velocity.y > 0){
    if(this.cursors.left.isDown) {
        this.player.setVelocityX(-200); //x축 속도 설정 
        this.facing = 'left';
    }
    if(this.cursors.right.isDown) {
        this.player.setVelocityX(200); //x축 속도 설정 
        this.facing = 'right';
    }
        return;
}
this.player.anims.play('right_jump', true);
if(this.cursors.left.isDown) {
    this.player.setVelocityX(-200); //x축 속도 설정 
    this.facing = 'left';
    this.player.anims.play('left_jump', true);
    return;
}
if(this.cursors.right.isDown) {
    this.player.setVelocityX(200); //x축 속도 설정 
    this.facing = 'right';
}
}

if(this.ctrl.isDown) {
    if(this.pause)
        return;
    this.player.setVelocityX(0);
    if(this.facing =='left')
    this.player.anims.play('left_attack', true);
    else if(this.facing =='right')
    this.player.anims.play('right_attack', true);
}
else if (this.key_w.isDown) {
    //W키를 눌렀을 때 월드맵 팝업

    let width = 1000;
    let height = 600;
    let top = (window.innerHeight - height) / 2 + screenY;
    let left = (window.innerWidth - width) / 2 + screenX;

    let spec = 'status=no, menubar=no, toolbar=no, resizable=no';
    spec += ', width=' + width + ', height=' + height;
    spec += ', top=' + top + ', left=' + left;

    window.open('Worldmap.html', 'popup', spec);
    
}
else if (this.space.isDown && this.cursors.down.isDown && this.player.body.touching.down ) //아래로 점프  alt + down
    {if(this.pause)
        return;
        this.player.setVelocityY(10); //y축 속도 설정 
        this.colliderB.active = false; //
       
    }else if(this.space.isDown) //점프 alt
    {if(this.pause)
        return;
        if(this.player.body.velocity.y < 0.1) {
            this.colliderB.active = false; //
        }
        if(this.player.body.touching.down)
            this.player.setVelocityY(-570); //y축 속도 설정    
    }

    else if(this.key_x.isDown) {
        if(this.pause)
        return;
        if((this.player.x >= 2700 && this.player.x <= 2770 && this.player.y <=  506 && this.player.y >= 505) ||
        (this.player.x >= 2860 && this.player.x <= 2930 && this.player.y <=  506 && this.player.y >= 505) ||
        (this.player.x >= 3610 && this.player.x <= 3640 && this.player.y <=  506 && this.player.y >= 505)) {
            this.key_x_down++;
            this.key_x_down %= 2;
        }
    }

    else if (this.cursors.left.isDown) //왼쪽 (왼쪽방향키 누를시 실행)
    { if(this.pause)
        return;
        if(this.player.body.touching.down)
        this.player.anims.play('left', true); 
        // if((this.player.x >= 1620 && this.player.x <= 1690) ||(this.player.x >= 1880 && this.player.x <= 1960) || (this.player.x >= 2060 && this.player.x <= 2140))
        // this.player.setVelocityY(-100); //x축 속도 설정 
        this.player.setVelocityX(-250); //x축 속도 설정 
        this.facing ='left';// 캐릭터 방향 
       

    }
    else if (this.cursors.right.isDown) //오른쪽 (오른쪽방향키 누를시 실행)
    { if(this.pause)
        return;
        if(this.player.body.touching.down)
        this.player.anims.play('right', true); 
        this.player.setVelocityX(250); //x축 속도 설정 
        this.facing = 'right';// 캐릭터 방향 
       
    }else if(this.cursors.up.isDown || this.cursors.down.isDown) { // 위
        // 5380, 380
        if(this.pause)
        return;
        if((this.player.x <= 5390 && this.player.x >= 5370 && this.player.y <= 500 && this.player.y >= 267) ||
            (this.player.x <= 5340 && this.player.x >= 5320 && this.player.y <= 250 && this.player.y >= -153) ||
            (this.player.x <= 6255 && this.player.x >= 6235 && this.player.y <= 500 && this.player.y >= 27) ||
            (this.player.x <= 1730 && this.player.x >= 1710 && this.player.y <= 380 && this.player.y >= 206) ||
            (this.player.x <= 3365 && this.player.x >= 3345 && this.player.y <= 440 && this.player.y >= 27) ||
            (this.player.x <= 2060 && this.player.x >= 2040 && this.player.y <= 20 && this.player.y >= -213) ||
            (this.player.x <= 3885 && this.player.x >= 3865 && this.player.y <= 500 && this.player.y >= 267)) {
            this.colliderB.active = false;
            this.player.setVelocityX(0);
            if(this.cursors.up.isDown)
                this.player.setVelocityY(-150);
            else
                this.player.setVelocityY(150);
            this.player.anims.play('up', true);
            this.facing = 'up';
        }
    }
    else{ if(this.pause)
        return;
        if(this.player.body.velocity.y < 0)
        return;
        if(this.player.body.velocity.y < 0){
            this.colliderB.active = false; //
        }
        else{
            this.colliderB.active = true;
        }
        this.player.setVelocityX(0); //멈춤 (키보드 떼면 자동으로 실행)
            if(this.facing == 'left'){
                this.player.anims.play('stop',true);
            }else{
                this.player.anims.play('stopright',true);
    }
    }
}




}
onEvent =()=>
    {
    this.colliderB.active = true;
    }
}