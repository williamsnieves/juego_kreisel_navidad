
'use strict';
function Final() {}

Final.prototype = {
  preload: function() {
    


  },
  create: function() {
    this.background = this.game.add.sprite(0,0,'bginit')
    this.smalllogo = this.game.add.sprite(250,20, 'logofinal')
    this.finalmessage = this.game.add.sprite(50,190, 'finalmessage')
    //this.btnplay = this.game.add.sprite(130,290, 'buttoninit')

    this.btnplay = this.game.add.button(260, 520, 'buttoncompromiso', this.actionOnClick, this, 2, 1, 0);
  },
  actionOnClick : function(){
    $("#carta").hide();
    $("#compromiso").show();
  },
  update: function() {
    this.game.state.start('final')
  }
};

module.exports = Final;
