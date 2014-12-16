
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.audio('bgsound', 'assets/bgsound.mp3');
    this.load.audio('bgsound2', 'assets/bgsound2.mp3');
    this.load.image('preloader', 'assets/loaderbar.jpg');
    this.load.image('bgprogress', 'assets/bgloader.jpg');
    this.load.image('bgprogress2', 'assets/bgloader2.png');
    this.load.image('bgloaderbar', 'assets/bgloaderbar.jpg');
    this.load.image('kreisellogo', 'assets/logo-cargador.gif');

  },
  create: function() {
    window.game = this;
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
    
  }
};


module.exports = Boot;



