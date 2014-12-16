
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;