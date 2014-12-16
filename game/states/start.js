
'use strict';
function Start() {}

Start.prototype = {
  preload: function() {

    
  },
  create: function() {
    this.background = this.game.add.sprite(0,0,'bgstart');

    //this.smalllogo = this.game.add.sprite(170,20, 'logosmall');
    this.btnplay = this.game.add.button(this.game.world.centerX, 490, 'btninit', this.actionOnClick, this, 2, 1, 0);
    this.btnplay.anchor.setTo(0.5,0.5);
  },
  actionOnClick : function(){

    $("#carta").hide();
    $("#registro").show();


    /*if(localStorage.getItem("username")){

      var usermail = localStorage.getItem("email_parent");

      var that = this;
      $.ajax({
        type : "GET",
        url: "api/user/"+usermail,
        dataType : "json",
        success : function(response){
          
          if(response.success){
            that.game.state.start('menu')
            //$("#carta").show();
            //console.log(window.game.state.start("menu"));
          }else{
            //alert("false");
            $("#registro").show();
          }
          
        }
      })  
    }else{
      $("#carta").hide();
      $("#registro").show();
    }*/
    //this.game.state.start('level1')
  },
  update: function() {
    //this.game.state.start('menu')
  }
};

module.exports = Start;
