if (Meteor.isClient) {
  Template.sideMenu.baseUrl = function () {
    return Session.get('baseUrl');
  };
  Template.sideMenu.myLocation = function () {
    if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.location){
      return Meteor.user().profile.location;
    }
  };

  Template.sideMenu.created = function () {
//    Meteor.setInterval(function(){
//
//    }, 200);
  };

  Template.sideMenu.events({
    'click #playRider' : function () {

      //New Situation
      bootbox.dialog("A situation is underway, are you ready?", [{
        "label" : "Yes, on my way!",
        "class" : "btn-success",
        "callback": function() {
          var mp3Url = Session.get('baseUrl') + '/preview/Fleet/media/LetsRock.mp3';
          audioHandle = gm.media.play(mp3Url, 'mixedAudio');

          Meteor.setTimeout(function(){
            var mp3Url = Session.get('baseUrl') + '/preview/Fleet/media/Knight%20Rider%20Theme%20Song%20Bass.mp3';
            audioHandle2 = gm.media.play(mp3Url, 'mixedAudio');
          }, 3000);

          //Set destination for NAV
          //gm.nav.setDestination({latitude:, longitude:});

          //Update DB status, on my way...

        }
      }, {
        "label" : "Nope, can't make it.",
        "class" : "btn-danger",
        "callback": function() {
          var mp3Url = Session.get('baseUrl') + '/preview/Fleet/media/QuitWastingMyTime.mp3';
          audioHandle = gm.media.play(mp3Url, 'mixedAudio');

          //Tell DB I'm not coming

        }
      }]);


//      var mp3Url = Session.get('baseUrl') + '/preview/Fleet/media/Knight%20Rider%20Theme%20Song%20Bass.mp3';
//      audioHandle = gm.media.play(mp3Url, 'mixedAudio');
//      console.log('clicked', mp3Url);
    },
    'click #storeLocation' : function () {
      gm.info.getCurrentPosition(function(Position){
         console.log("Current Position ", Position);
        if(Position && Position.coords){
          Users.update(Meteor.userId(), {$set: { 'profile.location': {latitude: Position.coords.latitude * 0.000000277777777778, longitude: Position.coords.longitude * 0.000000277777777778} }});
        }
      });
    },
    'click #logout' : function () {
      Meteor.logout();
    }
  });

  Template.login.events({
    'click #carOne' : function () {
      Meteor.loginWithPassword('carOne', 'pass');
    },
    'click #carTwo' : function () {
      Meteor.loginWithPassword('carTwo', 'pass');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    // call calculate now, this loops every n period
    calculateLoop();
  });
}
