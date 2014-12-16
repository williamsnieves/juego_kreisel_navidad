
'use strict';

var WebFontConfig;


function Preload() {
  this.asset = null;
  this.ready = false;
}



Preload.prototype = {
  preload: function() {

    this.game.stage.backgroundColor = this.game.add.sprite(0,0,"bgprogress");
    //this.bgloader.anchor.setTo(0.5, 0.5);

    var loadingText = this.game.add.text(this.game.world.centerX,450, 'CARGANDO', {font: '30px Arial', fill:'#2252a4'});

    loadingText.anchor.setTo(0.5, 0.5);
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


    this.logoloader = this.add.sprite(this.game.world.centerX,200,'kreisellogo');
    this.logoloader.anchor.setTo(0.5, 0.5);

    this.bgloaderbar = this.add.sprite(this.game.width/2,400, 'bgloaderbar');
    this.bgloaderbar.anchor.setTo(0.5, 0.5);

    this.asset = this.add.sprite(this.game.width/2,400, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);



    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    


    //this.load.image('yeoman', 'assets/yeoman-logo.png');

    


    this.load.image('bginit', 'assets/fondostart.png');
    this.load.image('bgstart', 'assets/fondostart1.png');
    this.load.image('btninit', 'assets/botoninit.png');
    this.load.image('logosmall', 'assets/logosmall.png');
    this.load.image('instrucciones', 'assets/instrucciones.png');
    this.load.image('buttoninit','assets/btnplay.png');
    this.load.audio('coinsHit', 'assets/agarra_monedas.mp3');
    this.load.audio('coinsBigHit', 'assets/big_coin_sound.mp3');
    this.load.audio('scoreSound', 'assets/falla_reintentar.mp3');
    this.load.audio('keySound', 'assets/key_sound.mp3');
    this.load.image('btnquestion','assets/btnpregunta.png');
    this.load.image('buttoncompromiso','assets/btncompromiso.png');
    this.load.image('finalmessage','assets/messagelevel5.png');
    this.load.image('btn_right','assets/arrow_right.png');
    this.load.image('btn_left','assets/arrow_left.png');
    this.load.image('btn_up','assets/arrow_up.png');


    /*this.load.image('logofinal','assets/logofinal.png');
    this.load.image('skewleft','assets/btnskewleft.png');
    this.load.image('skewright','assets/btnskewright.png');

    this.load.image('question1bg', 'assets/fondoquestion1.png');
    this.load.image('question2bg', 'assets/fondoquestion2.png');
    this.load.image('question3bg', 'assets/fondoquestion3.png');
    this.load.image('question4bg', 'assets/fondoquestion4.png');
    this.load.image('btnlevel2', 'assets/btnlevel2.png');
    this.load.image('btnlevel3', 'assets/btnnivel3.png');
    this.load.image('btnlevel4', 'assets/btnnivel4.png');
    this.load.image('btnlevel5', 'assets/btnnivel5.png');
    this.load.image('check', 'assets/check.png');

    this.load.image('background', 'assets/bglevel1extend.png');
    this.load.image('background2', 'assets/bglevel2extended.png');
    this.load.image('background3', 'assets/bglevel3extend.png');
    this.load.image('background4', 'assets/bg4extend.png');
    this.load.image('background5', 'assets/bglevel5extend.png');
    this.load.image('floor', 'assets/floorlevel1.png');
    this.load.image('floor2', 'assets/floorlevel2.png');
    this.load.image('floor3', 'assets/floorlevel3.png');
    this.load.image('floor4', 'assets/floorlevel4.png');
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
    this.load.image('scorefinal1','assets/scorefinal1.png');
    this.load.image('scorefinal2','assets/scorefinal2.png');
    this.load.image('scorefinal3','assets/scorefinal3.png');
    this.load.image('scorefinal4','assets/scorefinal4.png');
    this.load.image('btnquestion','assets/btnpregunta.png');
    this.load.image('velo','assets/velo.png');
    this.load.image('wall','assets/wallup.png');
    this.load.image('wall2','assets/walldown.png');
    this.load.image('wall4','assets/walldown4.png');
    this.load.image('sheet','assets/hoja.png');
    this.load.image('bginit','assets/fondostart.png');
    this.load.image('finalmessage','assets/messagelevel5.png');
    this.load.image('buttoncompromiso','assets/btncompromiso.png');
    this.load.spritesheet('snowflakes','assets/snowflakes.png',17,17);
    this.load.spritesheet('snowflakes_large','assets/snowflakes_large.png',64,64);
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.game.load.spritesheet('nino', 'assets/nino.png', 33.5, 58);
    this.game.load.spritesheet('nina', 'assets/nina.png', 33.5, 58);


    this.load.audio('coinsHit', 'assets/agarra_monedas.mp3');
    this.load.audio('scoreSound', 'assets/falla_reintentar.mp3');*/
  },
  create: function() {

    if(!this.game.device.desktop){
        /*this.game.scale.minWidth = 250;
        this.game.scale.minHeight = 170;
        this.game.scale.maxWidth = 1000;
        this.game.scale.maxHeight = 680;*/

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        /*this.game.scale.setScreenSize(true);*/
    }

    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('start');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
