
  'use strict';

  //var Scoreboard = require('../prefabs/scoreboard');

  function Level2() {}
  Level2.prototype = {

    preload : function(){

      this.game.stage.backgroundColor = this.game.add.sprite(0,0,"bgprogress2");
      //this.load.image('preloader', 'assets/preloader.gif');

      var loadingText = this.game.add.text(this.game.world.centerX,450, 'CARGANDO', {font: '30px Arial', fill:'#2252a4'});

      loadingText.anchor.setTo(0.5, 0.5);

      this.logoloader = this.add.sprite(this.game.world.centerX,200,'kreisellogo');
      this.logoloader.anchor.setTo(0.5, 0.5);

      this.bgloaderbar = this.add.sprite(this.game.width/2,400, 'bgloaderbar');
      this.bgloaderbar.anchor.setTo(0.5, 0.5);

      this.asset = this.add.sprite(this.game.width/2,400, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.setPreloadSprite(this.asset);

      this.load.image('background2', 'assets/bglevel2extended.png');
      
      if(localStorage.getItem('genere') === 'niño'){
        this.game.load.spritesheet('nino', 'assets/nino.png', 32, 56);
      }

      if(localStorage.getItem('genere') === 'niña'){
        this.game.load.spritesheet('nina', 'assets/nina.png', 32, 56);
      }
      
      this.load.image('floor2', 'assets/floorlevel2.png');
      this.load.image('table', 'assets/tablelarge.png');
      this.load.image('bigtable', 'assets/tablebig.png');
      this.load.image('coin', 'assets/coinsmall.png');
      this.load.image('bigcoin', 'assets/bigcoin.png');
      this.load.image('hudbg', 'assets/bghudbottom.png')
      this.load.image('logohud', 'assets/logosmallhud.png')
      this.load.image('stars', 'assets/star.png');
      this.load.image('gameover', 'assets/gameover.png');
      this.load.image('tryagain', 'assets/tryagain.png');
      this.load.image('scoreboard', 'assets/scoreboard.png');
      this.load.image('btnstart', 'assets/btncontinue.png');
      this.load.image('btnrestart', 'assets/restart.png');
      this.load.image('levelhud', 'assets/bglevelhud.png');
      this.load.image('key','assets/key.png');
      this.load.image('star','assets/star_particle.png');
      this.load.image('scorefinal2','assets/scorefinal2.png');
      this.load.image('velo','assets/velo.png');
      this.load.image('wall2','assets/walldown.png');
      this.load.image('btnstart', 'assets/btncontinue.png');
    },

    create: function() {

      //this.countDown = 60;
      this.currentMinute = 0;
      this.currentsecond = 0;
      this.totalSeconds = 60;
      this.totalMinutes = 2;
      this.minutes = 1;
      this.seconds = 60;
      this.counter = 4;
      this.score = 0;
      this.scoreText;
      this.totalScore = 1;
      this.limitCoins = 1;

      this.limitLevel = 5;

      this.currentLevel = 2;

      localStorage.removeItem('restarted')

      

      //esto se utiliza para ampliar el scenario

      this.game.world.setBounds(0, 0, 3000, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 3000, 600,'background2');

      this.ground = this.game.add.sprite(0,450,'floor2');

      /*var emitter;

      emitter = this.game.add.emitter(200, 200, 200);

      emitter.makeParticles('star');

      console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
      emitter.start(false, 500, 100);*/

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(4,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      //console.log(this.ground);
      //this.ground.body.enable = true;
      this.plataforms = this.game.add.group();
      this.plataforms.enableBody = true;

      this.bigplataform = this.game.add.group();

      this.bigplataform.enableBody = true;

      this.walls = this.game.add.group();
      this.walls.enableBody = true;

      this.coins = this.game.add.group();

      this.coins.enableBody = true;

      this.bigCoins = this.game.add.group();

      this.bigCoins.enableBody = true;
      
      this.addBigTable(650,180,false)
      

      //console.log(bigtable.cameraOffset);

      this.addWall(40, 265);

      this.addSmallTable(280,300);

      this.addSmallTable(580,380);   

      this.addSmallTable(850,280);


      this.addSmallTable(1200,200);

      this.addSmallTable(1200,100);

      this.addSmallTable(1500,150,true,1800);


      this.addSmallTable(1900,280);

      this.addSmallTable(2300,280);
      this.addSmallTable(2600,220);
      this.addSmallTable(2000,380);
      this.addSmallTable(2200,180);

      this.addBigTable(2000,100);


      this.addBigTable(2700,150,true);




      

      this.addWall(1500, 265);

      /*this.plataforms.enableBody = true;

      var table = this.plataforms.create(700,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,400, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;*/

     
      if(localStorage.getItem('genere') === 'niño'){
         this.player = this.game.add.sprite(100, 100, 'nino');
      }else{
         this.player = this.game.add.sprite(100, 100, 'nina');
      }

      this.player.kill();

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 6) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 12) * 50,200);
      }

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 8) * 50,320);
      }

      this.loadBigCoins(670,0);


    
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 17) * 50,50);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 25) * 50,50);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 24) * 50,150);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 25) * 50,300);
      }

      this.loadSmallCoins(1600,150);

      this.loadSmallCoins(1800,50);

      this.loadBigCoins(2020,0)

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 38) * 50,250);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 40) * 50,280);
      } 

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 45) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 48) * 50,100);
      }

      for(var i = 0; i < 10; i++){
        this.loadSmallCoins((i + 50) * 50,200);
      } 

      this.loadBigCoins(2720,0)

      /*for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 30) * 50,100);
      } 

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 35) * 50,280);
      }

      this.loadSmallCoins(2000,150);

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 47) * 50,100);
      }


      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 55) * 50,280);
      }

      //this.loadSmallCoins(200,100,40);

      this.loadBigCoins(670,0);

      this.loadBigCoins(2580,0);*/

      


      /*var bigCoin = this.bigCoins.create(590,0,'bigcoin'); 
      bigCoin.body.gravity.y = 80;*/

      

      //for(var i = 0; i< 1; i++){

         
        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      //}


     if(!this.game.device.desktop){
        this.addMobileInputs();
      }

      this.bghud = this.game.add.sprite(0,500,'hudbg');
      this.bghud.fixedToCamera = true;

      
      this.logohud = this.game.add.sprite(10,10,'logohud');

      this.logohud.fixedToCamera = true; 


      this.timesText = this.game.add.text(10,510,'Segundos',{ font: 'bold 16px Ultra', fill: '#355b00'})
      
      this.clock = this.game.add.text(10,525,'02:00',{ font: '28px Ultra', fill: '#fff', stroke: '#355b00', strokeThickness : 6 })


       

      this.timer = this.game.time.create(false);

      //console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      //this.timer.start();
    

      this.timesText.fixedToCamera = true;

      this.clock.fixedToCamera = true;

      this.intents = this.game.add.text(700,510,'Intentos',{ font: 'bold 16px Ultra', fill: '#355b00'})

      this.lives = this.game.add.group();

      for(var i=0; i< 3;i++){
        var star = this.lives.create(700 + (27 * i), 535, 'stars');
        star.fixedToCamera = true;
        star.alpha = 0.7;
      }

      this.intents.fixedToCamera = true;

      this.staticText = this.game.add.text(580,510,'Monedas',{ font: 'bold 16px Ultra', fill: '#355b00'});
      this.scoreText = this.game.add.text(580,535, this.limitCoins + ' / ',{ font: 'bold 18px Ultra', fill: '#fff', stroke: '#355b00', strokeThickness : 7 })

      //this.scoreText.anchor.set(0.5);

      this.scoreText.textAlign = 'center';

      this.scoreText.fixedToCamera = true;
      this.staticText.fixedToCamera = true;

      

      this.scoreText.fixedToCamera = true;
      


      

      
      this.initCounter = this.game.add.text(350,100,'',{ font: 'bold 45px Ultra', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 })
      /*this.initCounter.font = "Revalia";
      this.initCounter.fontSize = "40px";
      this.initCounter.fill = "#ff0000";*/

      this.initCounter.fixedToCamera = true;


      this.initTimer = this.game.time.create(false);

      this.initTimer.loop(1000, this.updateInitCounter, this);

      this.initTimer.start();


      this.levelhud = this.game.add.sprite(700,10, 'levelhud');
      this.levelhud.fixedToCamera = true;

      this.levelText = this.game.add.text(710,20,'Nivel',{ font: '20px Ultra', fill: '#ffffff'});
      /*this.levelText.font = "Revalia";
      this.levelText.fontSize = "20px";
      this.levelText.fill = "#fff";*/

      this.levelText.fixedToCamera = true;

      this.currentlevelText = this.game.add.text(710,40,this.currentLevel,{ font: '30px Ultra', fill: '#AFAA24'});
      /*this.currentlevelText.font = "Revalia";
      this.currentlevelText.fontSize = "30px";
      this.currentlevelText.fill = "#AFAA24";*/

      this.currentlevelText.fixedToCamera = true;

      this.limitlevelText = this.game.add.text(730,40,'/'+this.limitLevel,{ font: '30px Ultra', fill: '#fff'});
      /*this.limitlevelText.font = "Revalia";
      this.limitlevelText.fontSize = "30px";
      this.limitlevelText.fill = "#FFF";*/

      this.limitlevelText.fixedToCamera = true;

      this.coinHitSound = this.game.add.audio('coinsHit');
      this.scoreSound = this.game.add.audio('scoreSound');
      this.coinBigHitSound = this.game.add.audio('coinsBigHit');
      this.keySound = this.game.add.audio('keySound');

      this.music  = this.game.add.audio('bgsound');
      this.music.loop = true;
      this.music.play();
      /*console.log("cronos");
      console.log(this.cronos);
      console.log(this.scoreText)
      console.log(this.stars);*/
    },
    update: function() {

      this.game.physics.arcade.collide(this.player, this.ground);
      this.game.physics.arcade.collide(this.player, this.plataforms);

      this.game.physics.arcade.collide(this.coins, this.ground);
      this.game.physics.arcade.collide(this.coins, this.plataforms);

      this.game.physics.arcade.collide(this.coins, this.bigplataform);

      this.game.physics.arcade.collide(this.player, this.bigplataform);

      this.game.physics.arcade.collide(this.player, this.walls);
      this.game.physics.arcade.collide(this.coins, this.walls);
      
      this.game.physics.arcade.overlap(this.player, this.coins, this.collectStar, null, this);

      //this.game.physics.arcade.collide(this.bigCoins, this.plataforms);

      this.game.physics.arcade.collide(this.bigCoins, this.bigplataform);      

      this.game.physics.arcade.overlap(this.player, this.bigCoins, this.collectBigCoin, null, this);

      
      if(this.score < this.totalScore){
          this.player.body.velocity.x = 0;

          if(this.cursors.left.isDown || this.moveLeft){
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
          }
          else if(this.cursors.right.isDown || this.moveRight){
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
          }
          else{
            this.player.animations.stop();
            this.player.frame = 4;
          }

          if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -250;
          }
      }else{
          this.player.frame = 4;
          this.player.body.velocity.y = 0;
          this.player.body.velocity.x = 0;
          this.player.animations.stop();
      }
      

      //this.updatetimer();
    },

    updateCounter : function(){

      --this.seconds;

      var secondsAux = this.seconds;

      this.currentsecond++;

      var tempseconds = 0;

      

      /*if(this.currentsecond === this.totalSeconds){
        console.log("termine mi tiempo");
      }*/

      if(this.seconds < 10){
        this.clock.setText('0'+this.minutes+':0'+this.seconds);
        if(secondsAux == 0){
          if(this.currentsecond == this.totalSeconds){
            tempseconds = this.currentsecond;
            this.seconds = tempseconds;
            this.minutes = 0;

            //console.log("preubas");
          }
        }
        //console.log("estoy menor a 10")
      }else{
        this.clock.setText('0'+this.minutes+':'+this.seconds);
      }

      if(this.seconds === 0){
        //console.log("termine de contar");
        this.timer.stop();
        this.restartGame();
      }

      /*--this.countDown;
      if (this.countDown < 10) {
        this.clock.setText('00:0' + this.countDown);
      } else {
        this.clock.setText('00:' + this.countDown);
      }
       
      if (this.countDown === 0) {
        this.timer.stop();
        this.restartGame();
      }*/
    },
    clickListener: function() {
      this.game.state.start('gameover');
    },

    collectStar : function(player, coin){
      coin.kill();
      this.coinHitSound.play();

      this.score += 4;

      if(this.score > this.totalScore){
        this.score = this.totalScore;
      }
      //console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    addMobileInputs: function(){
      this.jumpButton = this.game.add.sprite(90, 390, 'btn_up');
      this.jumpButton.inputEnabled = true;
      this.jumpButton.alpha = 0.5;
      this.jumpButton.fixedToCamera = true;

      this.jumpButton.events.onInputDown.add(this.jumpPlayer, this);

      this.moveLeft = false;
      this.moveRight = false;

      this.leftButton = this.game.add.sprite(50, 447, 'btn_left');
      this.leftButton.inputEnabled = true;
      this.leftButton.fixedToCamera = true;
      this.leftButton.events.onInputOver.add(function(){this.moveLeft=true;}, this);
      this.leftButton.events.onInputOut.add(function(){this.moveLeft=false;}, this);
      this.leftButton.events.onInputDown.add(function(){this.moveLeft=true;}, this);
      this.leftButton.events.onInputUp.add(function(){this.moveLeft=false;}, this);
      this.leftButton.alpha = 0.5;

      this.rightButton = this.game.add.sprite(130, 447, 'btn_right');
      this.rightButton.inputEnabled = true;
      this.rightButton.fixedToCamera = true;
      this.rightButton.events.onInputOver.add(function(){this.moveRight=true;}, this);
      this.rightButton.events.onInputOut.add(function(){this.moveRight=false;}, this);
      this.rightButton.events.onInputDown.add(function(){this.moveRight=true;}, this);
      this.rightButton.events.onInputUp.add(function(){this.moveRight=false;}, this);
      this.rightButton.alpha = 0.5;
    },

    jumpPlayer: function(){
      //if(this.cursors.up.isDown && this.player.body.touching.down){
           
        //if(this.player.body.onFloor()){

          this.player.body.velocity.y = -250;
        //}
      //}
    },

    collectBigCoin : function(player, bigcoin){

      
      bigcoin.kill();
      this.coinBigHitSound.play();
      this.score += 50;

      if(this.score > this.totalScore){
        this.score = this.totalScore;
      }
      /* fin del codigo de intentos*/
      //console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    restartGame : function(){
      //console.log("reinicio el juego")
      this.music.stop();
      this.scoreSound.play();
      this.live = this.lives.getFirstAlive();
      //this.scoreboard = new Scoreboard(this.game,this.player,this.timer,this.countDown);
      
      /* aqui agrego el scoreboard de forma manual invocando el sprite correspondiente */




      if(this.live){

        this.showRestartScoreBoardGameOver();

        this.live.kill();

        /*console.log(this.lives.countLiving());
        console.log(this.score);*/

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());

        
        //console.log(new Scoreboard(this.game));

        this.player.kill();
        
        //this.game.add.existing(this.scoreboard);
        //this.scoreboard.showRestart(this.score,this.lives.countLiving());
        
        

        //this.player.revive();
      }

      if(this.lives.countLiving() < 1){




        this.player.kill();

        this.scoreboardGroup.destroy();

        this.showScoreBoardGameOver();

        //console.log("pruebas");

        /*this.startButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);*/

        //alert("pruebas");
      }
    },

    restartClick : function(){

      var that = this;

      this.scoreboardGroup.forEach(function(item){
        //console.log(item);
        that.game.add.tween(item).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      })
      //this.game.add.tween(this.scoreboardGroup._container).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
      //this.game.add.tween(this.scoreboardGroup.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);


      this.restartElements();
    },

    restartElements : function(){
      this.music.play();

      this.player.revive();

      this.player.position.x = 100
      this.player.position.y = 100;

      //this.countDown = 60;

      this.secMinTen = false;
      this.timeover = false;
      this.currentMinute = 0;
      this.currentsecond = 0;
      this.totalSeconds = 60;
      this.totalMinutes = 2;
      this.minutes = 1;
      this.seconds = 60;

      this.score = 0;

      this.scoreText.text = this.limitCoins+" / "+ this.score;
      this.clock.setText("02:00");

      this.timer = this.game.time.create(false);

      //console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      this.timer.start();

      this.addCoins();

      //this.updateCounter();
      //alert("reseteo elementos")
    },

    showScoreBoardGameOver : function(){
        
        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'gameover');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.initButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.gameOver, this);
        this.initButton.anchor.setTo(0.5,0.5);

        this.initButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.initButton);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());  

        //this.scoreboardGroup.remove(this.startButton);

        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showRestartScoreBoardGameOver : function(){


        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'tryagain');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.startButton = this.game.add.button(this.game.width/2, 310, 'btnrestart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

        this.startButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.startButton);






        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showCompleteLevel : function(){
        //this.player.kill();
        //console.log(this.player)
        this.music.stop();
        this.key = this.game.add.sprite(this.player.position.x + 60,this.player.position.y - 70,'key');
        this.key.alpha = 0;

        this.game.add.tween(this.key).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.key.position).to( {y: this.player.position.y - 50 }, 5000, Phaser.Easing.Back.InOut, true, 0, 5000, true);
        //var emitter;

        this.emitter = this.game.add.emitter(this.key.position.x + 20, this.key.position.y , 200);

        this.emitter.makeParticles('star');

        //console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
        this.emitter.start(false, 1000, 50);

        this.timerKey = this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeKey, this);

        this.keySound.play();
        
    },

    gameOver : function(){
        this.game.state.start("level2");
    },

    updateInitCounter : function(){
        
        --this.counter;
        this.initCounter.setText(this.counter);

        if (this.counter < 1) {
          this.initTimer.stop();
          this.showInitText();
        }
    },

    showInitText : function(){

      this.game.add.tween(this.initCounter).to({alpha : 0}, 10, Phaser.Easing.Linear.None, true, 0);

      this.player.revive();

      this.timer.start();

      this.initText = this.game.add.text(this.game.world.x + 300,100,'¡Corre!',{ font: 'bold 45px Ultra', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 });
      /*this.initText.font = "Revalia";
      this.initText.fontSize = "40px";
      this.initText.fill = "#ff0000";*/

      this.cronos = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeInitText, this);

    },

    removeInitText : function(){
        this.game.add.tween(this.initText).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
    },

    removeKey : function(){
      //console.log(this.emitter);
      this.game.add.tween(this.key).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      this.emitter.on = false;

      this.showFinalScore();
    },
    showFinalScore : function(){

      this.velo = this.game.add.sprite(0,0,'velo');

      this.velo.fixedToCamera = true;
      this.scoreboardFinalGroup = this.game.add.group();

      this.scoreboardFinalGroup.position.y = this.game.height;
      this.scoreboardFinalGroup.position.x = 0;

    

      this.scorefinalboard = this.scoreboardFinalGroup.create(this.game.width / 2, 300, 'scorefinal2');
      this.scorefinalboard.anchor.setTo(0.5, 0.5);

      this.scorefinalboard.fixedToCamera = true;

      this.questionButton = this.game.add.button(this.game.width/2, 550, 'btnquestion', this.removeCanvas, this);
      this.questionButton.anchor.setTo(0.5,0.5);

      this.questionButton.fixedToCamera = true;
      this.scoreboardFinalGroup.add(this.questionButton);

      this.game.add.tween(this.scoreboardFinalGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
      
      this.game.transparent = true;
      //console.log(this.game);
    },
    removeCanvas : function(){
      //$("#plataform").hide();
      this.game.state.start('question2');
    },
    loadSmallCoins : function(x, y){
        
        var coin  = this.coins.create(x, y, 'coin');

        coin.body.gravity.y = 800;


    },
    loadBigCoins : function(x, y){

        this.bigcoin  = this.bigCoins.create(x, y, 'bigcoin');

         this.bigcoin.body.gravity.y = 800;


    },
    addSmallTable : function(x, y, tween, toX){

        var table = this.plataforms.create(x,y,'table')
        
        table.body.immovable = true;

        if(tween)
          this.game.add.tween(table.position).to( { x: toX }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);


    },
    addBigTable : function(x, y, tween){
      

      var bigtable = this.bigplataform.create(x,y,'bigtable');

      bigtable.body.immovable = true;

      bigtable.body.allowGravity = true;

      //bigtable.body.gravity.x = -10;

      if(tween)
        this.game.add.tween(bigtable.position).to( { y: 100 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);
    },
    addWall : function(x, y){

      var wall = this.walls.create(x,y,'wall2')
        
      wall.body.immovable = true;
      
    },
    addCoins : function(){

      this.removeCoins();

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 6) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 12) * 50,200);
      }

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 8) * 50,320);
      }

      this.loadBigCoins(670,0);


    
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 17) * 50,50);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 25) * 50,50);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 24) * 50,150);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 25) * 50,300);
      }

      this.loadSmallCoins(1600,150);

      this.loadSmallCoins(1800,50);

      this.loadBigCoins(2020,0)

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 38) * 50,250);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 40) * 50,280);
      } 

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 45) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 48) * 50,100);
      }

      for(var i = 0; i < 10; i++){
        this.loadSmallCoins((i + 50) * 50,200);
      } 

      this.loadBigCoins(2720,0)
    },
    removeCoins : function(){

      this.coins.removeAll();      
      this.bigCoins.removeAll();
    }


  };
  
  module.exports = Level2;