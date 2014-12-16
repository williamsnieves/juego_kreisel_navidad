'use strict';

var Biglogo = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'logobig', frame);

  // initialize your prefab here

  this.anchor.setTo(0.5, 0.5);
  this.alpha = 0;
  
};

Biglogo.prototype = Object.create(Phaser.Sprite.prototype);
Biglogo.prototype.constructor = Biglogo;

Biglogo.prototype.update = function() {
  
  // write your prefab's specific update code here
  //this.game.add.tween(this).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  this.game.add.tween(this).to({angle: -40}, 100).start();
};

module.exports = Biglogo;
