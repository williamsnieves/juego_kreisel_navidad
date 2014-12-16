
'use strict';
function Question3() {}

Question3.prototype = {
  preload: function() {

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
    
    this.load.image('question3bg', 'assets/fondoquestion3.png');
    this.load.image('btnlevel4', 'assets/btnnivel4.png');
    this.load.image('check', 'assets/check.png');
    this.load.image('skewleft','assets/btnskewleft.png');
    this.load.image('skewright','assets/btnskewright.png');
    this.load.image('logofinal','assets/logofinal.png');
  },
  create: function() {
    this.coinBigHitSound = this.game.add.audio('coinsBigHit');
    this.background = this.game.add.sprite(0,0,'bginit')
    this.smalllogo = this.game.add.sprite(250,10, 'logofinal')
    this.instrucciones = this.game.add.sprite(50,160, 'question3bg')
    this.musicout  = this.game.add.audio('bgsound2');
    this.musicout.loop = true;
    this.musicout.play();
    //this.btnplay = this.game.add.sprite(130,290, 'buttoninit')
    //160, 400, 630
    this.check = this.game.add.sprite(0,370,'check');
    this.check.alpha = 0;
    var firstquest = JSON.parse(localStorage.getItem("questions"));

    /*console.log("dentro de las preguntas");
    console.log(firstquest.questions[2].question.toString());*/
    this.timesText = this.game.add.text(80,330,firstquest.questions[2].question.toString().toUpperCase(),{ font: 'bold 28px Arial', fill: '#00422e'})
    this.firstquestion = this.game.add.text()
    this.btnplay2 = this.game.add.button(300, 530, 'btnlevel4', this.actionOnClick, this, 2, 1, 0);
    
    
    this.answersGroup = this.game.add.group();

    //this.answersGroup.position.y = this.game.height;
    //this.answersGroup.position.x = 100;

    var answers1 = JSON.parse(localStorage.getItem("questions"));
    var answers2 = JSON.parse(localStorage.getItem("questions"));
   
    this.btnansleft1 = this.game.add.button(230,400, 'skewleft', this.firstAnswerlev3,this);
    this.btnansleft1.name = answers1.answers[3].answer.toString();
    this.answersGroup.add(this.btnansleft1);

    
    this.timesText1 = this.game.add.text(300,422,answers1.answers[3].answer.toString(),{ font: 'bold 30px Myriad Pro', fill: '#FFFFFF'});

    this.answersGroup.add(this.timesText);


    this.btnansright1 = this.game.add.button(460,400, 'skewright', this.secondAnswerlev3,this);
    this.btnansright1.name = answers2.answers[4].answer.toString();
    this.answersGroup.add(this.btnansright1);

    
    this.timesText2 = this.game.add.text(520,422,answers2.answers[4].answer.toString(),{ font: 'bold 30px Myriad Pro', fill: '#FFFFFF'});

    this.answersGroup.add(this.timesText2);

    var firstquest = JSON.parse(localStorage.getItem("questions"));
    this.check.position.x = 300;
    this.check.alpha = 1;
    localStorage.setItem("level3", firstquest.questions[2].level.toString());
    localStorage.setItem("question3", firstquest.questions[2].question.toString());
    localStorage.setItem("answer3", this.btnansleft1.name.toString());




    //this.btnansright = this.game.add.sprite(330,400, 'skewright'); 

    //this.btnansleft2 = this.game.add.sprite(560 ,400, 'skewleft'); 
  
  
  },
  firstAnswerlev3:function(item){
    this.coinBigHitSound.play();
    var firstquest = JSON.parse(localStorage.getItem("questions"));
    this.check.position.x = 300;
    this.check.alpha = 1;
    localStorage.setItem("level3", firstquest.questions[2].level.toString());
    localStorage.setItem("question3", firstquest.questions[2].question.toString());
    localStorage.setItem("answer3", item.name.toString());
  },
  secondAnswerlev3:function(item){
    this.coinBigHitSound.play();
    var firstquest = JSON.parse(localStorage.getItem("questions"));
    this.check.position.x = 520;
    this.check.alpha = 1;
    localStorage.setItem("level3", firstquest.questions[2].level.toString());
    localStorage.setItem("question3", firstquest.questions[2].question.toString());
    localStorage.setItem("answer3", item.name.toString());
  },
  actionOnClick : function(){
    this.musicout.stop();
    this.game.state.start('level4');
  },
  update: function() {
    //this.game.state.start('question1')
  }
};

module.exports = Question3;
