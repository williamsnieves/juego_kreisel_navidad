'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'carta');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('final', require('./states/final'));
  game.state.add('first', require('./states/first'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('level1', require('./states/level1'));
  game.state.add('level2', require('./states/level2'));
  game.state.add('level3', require('./states/level3'));
  game.state.add('level4', require('./states/level4'));
  game.state.add('level5', require('./states/level5'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('question1', require('./states/question1'));
  game.state.add('question2', require('./states/question2'));
  game.state.add('question3', require('./states/question3'));
  game.state.add('question4', require('./states/question4'));
  game.state.add('start', require('./states/start'));
  

  game.state.start('boot');
};