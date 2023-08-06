
class Wapponshop extends Phaser.Scene {
    constructor() {
        super("wappon");
        this.location_x = 235; //캐릭터 스폰 위치
        this.location_y = 350;
    }
   
    
    
    //이미지 로딩 ----------------------------------------
    preload () 
    {
        this.load.image('map3', 'assets/무기상점.png');
        this.load.image('ground2', 'assets/ground_notsee.png');
        this.load.spritesheet('potal', 'assets/Potal.png',{ frameWidth: 89 , frameHeight: 240  });
        this.load.spritesheet('admin9', 'assets/무기상점npc.png',{ frameWidth: 71, frameHeight:75});
    }
    
    create (){
        this.physics.world.setBounds( 0, 0, 800 , 600);  
        this.facing = 'left';
        this.cameras.main.setBounds(0, 100, 800, 766);
    
        this.platformsG = this.physics.add.staticGroup({
            collideWorldBounds: true
        });
    
        this.platformsB = this.physics.add.staticGroup({
            collideWorldBounds: true
        });
    
        this.platforms = this.physics.add.staticGroup({
            collideWorldBounds: false
        });

    // 이미지 설정 
        this.add.image (400, 400, 'map3');  //맵 이미지 (가로위치,세로위치,url)
    
        this.platformsG = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();
    
        this.platformsG.create(400, 610, 'ground2').setScale(4).refreshBody(); // 가장 밑바닥 땅 
        this.platformsB.create(240, 510, 'ground2').setScale(0.4).refreshBody(); //공중 땅 블럭1
            
        this.player = this.physics.add.sprite(this.location_x, this.location_y, 'dude1');
        this.potal = this.physics.add.sprite(230,380,'potal').setImmovable(); //포탈 -setImmovable() -> 충돌에도 움직이지 않음 
        this.admin9 = this.physics.add.sprite(500, 2000, 'admin9').setInteractive(); // 운영자 -setInteractive() -> 이벤트 설정 가능메서드   
        
        //메인캐릭터 설정--------------------
        this.player.depth = 100; //캐릭터 레이어를 앞으로 설정
        this.player.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
        this.player.setCollideWorldBounds(true); //맵 밖으로 안나가게 
        this.player.body.setGravityY(1000) //캐릭터 중력설정
        this.player.setScale(1,1); // 크기 설정


        this.physics.add.collider(this.player, this.platformsG); //ground블럭과 충돌여부 
    
        
        this.colliderB = this.physics.add.collider(this.player, this.platformsB);
    
         
        //포탈 오브젝트 설정--------------------
        this.potal.body.setGravityY(-300) //포탈 중력설정
        this.physics.add.collider(this.potal, this.platforms); //ground블럭과 충돌여부 
    
         //운영자 캐릭터 설정-------------------
         this.admin9.body.setGravityY(300) //운영자 중력설정
         this.physics.add.collider(this.admin9, this.platformsG); //ground블럭과 충돌여부 
         this.admin9.setBounce(0); //땅에 닿았을때 다시 튀어오르는 정도
         this.admin9.setCollideWorldBounds(true); //맵 밖으로 안나가게 
     
          //운영자 움직임--------------
        this.anims.create({ 
            key: 'admin9',
            frames: this.anims.generateFrameNumbers('admin9',{start:0,end:12}), //프레임 선택  
            frameRate: 4, //프레임 재생속도
            repeat: -1 //반복
                }
            );
    
    
              //포탈 움직임---------------
        this.anims.create({ 
            key: 'potal',
            frames: this.anims.generateFrameNumbers('potal'), //프레임 선택 
            frameRate: 13, //프레임 재생속도
            repeat: -1  //반복
            });
    
                this.admin9.anims.play('admin9',true); //운영자 스프라이트 움직임 실행
                this.potal.anims.play('potal',true); //포탈 스프라이트 움직임 실행
    
    
        
    
                //메인 캐릭터 움직임--------------------------------------------
    
    
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
    frameRate: 10, //프레임 재생속도
    repeat: -1 //반복
    
});

this.anims.create({ 
    key: 'down', //key값 설정 
    frames: this.anims.generateFrameNumbers('dude5', { start: 0, end:1  }), //재생할 프레임 선택 
    frameRate: 10, //프레임 재생속도
    repeat: -1 //반복
    
});

this.anims.create({ 
    key: 'left_sit', //key값 설정 
    frames: [ { key: 'dude6', frame: 0 } ], //재생할 프레임 선택
    
});

this.anims.create({ 
    key: 'right_sit', //key값 설정 
    frames: [ { key: 'dude7', frame: 0 } ], //재생할 프레임 선택
    
});
    
    // 운영자 클릭시 대화 
    
    this.element = document.getElementById('input-box2');
    
    
    //대화 켜기 (캐릭터 선택)
    this.admin9.on('pointerdown',()=>{
        this.pause = true;
        console.log("클릭");
           if(this.element && this.element.style.display === 'none') {
            this.element.style.display = 'block';
          } 
        })
    
        //끄는 버튼  (대화창 close 버튼)
            document.getElementById('btn2').addEventListener('click',()=>{
            this.pause = false;
          this.element.style.display = 'none'
        })
        
     //아래점프시 충돌 설정 다시해줌
     this.timedEvent = this.time.addEvent({ delay: 800, callback: this.onEvent, callbackScope: this, loop: true });
        
    
// 카메라 설정----------------------------------
this.cameras.main.startFollow(this.player, true, 1,1);//속도
this.cameras.main.setZoom(1.5); // 줌 배율 
this.cameras.main.setFollowOffset( 0, 120);
    
    
    
    }
    
    
    
    
    //반복문으로 움직임 구현 부분 ---------------------------------------------------------
    update () {
        this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 입력 변수 선언 및 초기화   createCursorKeys() 메서드엔 up down left light space shift 만 지정되어 있음 
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // alt 키 추가 
        this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL); 
        this.key_x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X); 
        this.key_w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //console.log(this.player.y);
    //console.log( this.player.y);
    //포탈에서 맵이동 구현-----------------
    //console.log(this.potal.y+30);
    //console.log(this.potal.x);

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

    //console.log(this.player.x);
    console.log( this.player.y);
    //포탈에서 맵이동 구현-----------------
    if(this.player.x >= (this.potal.x-40) && this.player.x <= (this.potal.x+40) && this.player.y >=(this.potal.y+30) && this.player.y <=(this.potal.y+130) ){ 
        if(this.cursors.up.isDown  ){
            if(this.pause == true)
            return;
    
            console.log("이동");
           
            
            this.scene.start('hene', {x: 4103, y: 135});
            
          
        }
    }
  
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
            if((this.player.x >= 2700 && this.player.x <= 2770 && this.player.y <=  508 && this.player.y >= 507) ||
            (this.player.x >= 2860 && this.player.x <= 2930 && this.player.y <=  508 && this.player.y >= 507) ||
            (this.player.x >= 3610 && this.player.x <= 3640 && this.player.y <=  508 && this.player.y >= 507)) {
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
    
    onEvent =()=>
        {
        this.colliderB.active = true;
        }
    
        
    }