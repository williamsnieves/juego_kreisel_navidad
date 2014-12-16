
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

    this.game.stage.backgroundColor = this.game.add.sprite(0,0,"bgprogress");
    
    var loadingText = this.game.add.text(this.game.world.centerX,450, 'CARGANDO', {font: '30px Arial', fill:'#2252a4'});

    loadingText.anchor.setTo(0.5, 0.5);
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


    this.logoloader = this.add.sprite(this.game.world.centerX,200,'kreisellogo');
    this.logoloader.anchor.setTo(0.5, 0.5);

    this.bgloaderbar = this.add.sprite(this.game.width/2,400, 'bgloaderbar');
    this.bgloaderbar.anchor.setTo(0.5, 0.5);

    this.asset = this.add.sprite(this.game.width/2,400, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);



    //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
  },
  create: function() {
    this.background = this.game.add.sprite(0,0,'bginit')
    this.smalllogo = this.game.add.sprite(170,20, 'logosmall')
    this.instrucciones = this.game.add.sprite(50,240, 'instrucciones')
    //this.btnplay = this.game.add.sprite(130,290, 'buttoninit')
    this.musicout  = this.game.add.audio('bgsound2');
    this.musicout.loop = true;  
    this.musicout.play();


    this.btnplay = this.game.add.button(this.game.world.centerX - 95, 530, 'buttoninit', this.actionOnClick, this, 2, 1, 0);
  },
  actionOnClick : function(){
    this.musicout.stop();
    this.game.state.start('level1')
  },
  update: function() {
    //this.game.state.start('menu')
  }
};

module.exports = Menu;
