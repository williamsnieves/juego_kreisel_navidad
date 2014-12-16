
'use strict';
function Question1() {}

Question1.prototype = {
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
    
    this.load.image('question1bg', 'assets/fondoquestion1.png');
    this.load.image('btnlevel2', 'assets/btnlevel2.png');
    this.load.image('check', 'assets/check.png');
    this.load.image('skewleft','assets/btnskewleft.png');
    this.load.image('skewright','assets/btnskewright.png');
    this.load.image('logofinal','assets/logofinal.png');
  },
  create: function() {
    this.coinBigHitSound = this.game.add.audio('coinsBigHit');
    this.background = this.game.add.sprite(0,0,'bginit')
    this.smalllogo = this.game.add.sprite(250,10, 'logofinal')
    this.instrucciones = this.game.add.sprite(50,160, 'question1bg')
    //this.btnplay = this.game.add.sprite(130,290, 'buttoninit')
    this.musicout  = this.game.add.audio('bgsound2');
    this.musicout.loop = true;
    this.musicout.play();
    //this.btnplay = this.game.add.sprite(130,290, 'buttoninit')
    //160, 400, 630
    this.check = this.game.add.sprite(160,370,'check');
    this.check.alpha = 0;
    var firstquest = JSON.parse(localStorage.getItem("questions"));

    /*console.log("dentro de las preguntas");
    console.log(firstquest.questions[0].question.toString());*/
    this.timesText = this.game.add.text(140,330,firstquest.questions[0].question.toString().toUpperCase(),{ font: 'bold 28px Arial', fill: '#00422e'})
    this.firstquestion = this.game.add.text()
    this.btnplay = this.game.add.button(300, 530, 'btnlevel2', this.actionOnClick, this, 2, 1, 0);
    
    
    this.answersGroup = this.game.add.group();

    //this.answersGroup.position.y = this.game.height;
    //this.answersGroup.position.x = 100;

    var answers1 = JSON.parse(localStorage.getItem("questions"));
    var answers2 = JSON.parse(localStorage.getItem("questions"));
    var answers3 = JSON.parse(localStorage.getItem("questions"));
   
    this.btnansleft1 = this.game.add.button(100,400, 'skewleft', this.firstAnswer,this);
    this.btnansleft1.name = answers1.answers[0].answer.toString();
    this.answersGroup.add(this.btnansleft1);

    
    this.timesText1 = this.game.add.text(130,422,answers1.answers[0].answer.toString(),{ font: 'bold 30px Myriad Pro', fill: '#FFFFFF'});

    this.answersGroup.add(this.timesText);


    this.btnansright1 = this.game.add.button(330,400, 'skewright', this.secondAnswer,this);
    this.btnansright1.name = answers2.answers[1].answer.toString();
    this.answersGroup.add(this.btnansright1);

    
    this.timesText2 = this.game.add.text(380,422,answers2.answers[1].answer.toString(),{ font: 'bold 30px Myriad Pro', fill: '#FFFFFF'});

    this.answersGroup.add(this.timesText2);


    this.btnansleft2 = this.game.add.button(560,400, 'skewleft', this.thirdAnswer,this);
    this.btnansleft2.name = answers3.answers[2].answer.toString();
    this.answersGroup.add(this.btnansleft2);


    this.timesText3 = this.game.add.text(580,422,answers3.answers[2].answer.toString(),{ font: 'bold 30px Myriad Pro', fill: '#FFFFFF'});

    this.answersGroup.add(this.timesText3);

    var firstquest = JSON.parse(localStorage.getItem("questions"));

    this.check.position.x = 160;
    this.check.alpha = 1;
    localStorage.setItem("level1", firstquest.questions[0].level.toString());
    localStorage.setItem("question1", firstquest.questions[0].question.toString());
    localStorage.setItem("answer1", this.btnansleft1.name.toString());

    //this.btnansright = this.game.add.sprite(330,400, 'skewright'); 

    //this.btnansleft2 = this.game.add.sprite(560 ,400, 'skewleft'); 
  
  
  },
  firstAnswer:function(item){
    this.coinBigHitSound.play()
    var firstquest = JSON.parse(localStorage.getItem("questions"));
    this.check.position.x = 160;
    this.check.alpha = 1;
    localStorage.setItem("level1", firstquest.questions[0].level.toString());
    localStorage.setItem("question1", firstquest.questions[0].question.toString());
    localStorage.setItem("answer1", item.name.toString());
  },
  secondAnswer:function(item){
    this.coinBigHitSound.play()
    var firstquest = JSON.parse(localStorage.getItem("questions"));
    this.check.position.x = 400;
    this.check.alpha = 1;
    localStorage.setItem("level1", firstquest.questions[0].level.toString());
    localStorage.setItem("question1", firstquest.questions[0].question.toString());
    localStorage.setItem("answer1", item.name.toString());
  },
  thirdAnswer:function(item){
    this.coinBigHitSound.play()
    var firstquest = JSON.parse(localStorage.getItem("questions"));
    this.check.position.x = 630;
    this.check.alpha = 1;
    localStorage.setItem("level1", firstquest.questions[0].level.toString());
    localStorage.setItem("question1", firstquest.questions[0].question.toString());
    localStorage.setItem("answer1", item.name.toString());
    
  },
  actionOnClick : function(){
    this.musicout.stop();
    this.game.state.start('level2');
  },
  update: function() {
    //this.game.state.start('question1')
  }
};

module.exports = Question1;
