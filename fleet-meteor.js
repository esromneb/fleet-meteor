if (Meteor.isClient) {

  Template.sideMenu.helpers({
    carColor: function () {
      if(Meteor.user()){
        if(Meteor.user().username === "carOne")
          return "Red Car";
        else
          return "Blue Car";
      }
    }
  });

  Template.sideMenu.baseUrl = function () {
    return Session.get('baseUrl');
  };
  Template.sideMenu.myLocation = function () {
    if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.location){
      return Meteor.user().profile.location;
    }
  };


  Template.sideMenu.rendered = function () {
    watchForServiceEvents();
  };

  Template.sideMenu.events({
    'click #readyPosition' : function () {
      //Set destination for NAV
      var options = {latitude:(Meteor.user().profile.restingLocation.latitude / 0.000000277777777778), longitude:(Meteor.user().profile.restingLocation.longitude / 0.000000277777777778)};
      gm.nav.setDestination(function(){}, function(){}, options);
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
      Meteor.loginWithPassword('carOne', 'pass', function(error){
        if(!error){
          watchForServiceEvents();
        }
      });
    },
    'click #carTwo' : function () {
      Meteor.loginWithPassword('carTwo', 'pass', function(error){
        if(!error){
          watchForServiceEvents();
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    // call calculate now, this loops every n period
    calculateLoop();

    //look for events, update id of responder
    Meteor.defer(function(){
      dispatchServiceEvents();
    });
  });
}

//Look for pending events with my id, launch modal
var watchForServiceEvents = function(){
  askedToRepond = false;
  Destinations.find({'serviceStatus.state':"pending", 'serviceStatus.responderId':Meteor.userId()}).observe({
    added: function(document){
      Destinations.update(document._id, {$set:{'serviceStatus.state': "asked"}});
      //New Situation
      if(!askedToRepond){
        askedToRepond = true;
        bootbox.dialog("A situation is underway, are you ready?", [{
          "label" : "Yes, I'm on the case!",
          "class" : "btn-success",
          "callback": function() {

            var mp3Url = Session.get('baseUrl') + '/preview/Fleet/media/DukeAndKnight.mp3';
            audioHandle = gm.media.play(mp3Url, 'mixedAudio');

            var options = {latitude:(document.lat / 0.000000277777777778), longitude:(document.lon / 0.000000277777777778)};

            console.log(options);
            //Set destination for NAV
            gm.nav.setDestination(function(){}, function(){}, options);

            //Update DB status, on my way...
            Destinations.update(document._id, {$set:{'serviceStatus.state': "responding"}});
            askedToRepond = false;
            Session.set('onMyWay', true);
          }
        }, {
          "label" : "Nope, can't make it.",
          "class" : "btn-danger",
          "callback": function() {
            var mp3Url = Session.get('baseUrl') + '/preview/Fleet/media/QuitWastingMyTime.mp3';
            audioHandle = gm.media.play(mp3Url, 'mixedAudio');

            //Tell DB I'm not coming
            Destinations.update(document._id, {$set:{'serviceStatus.state': "busy"}});
            Destinations.update(document._id, {$set:{'serviceStatus.state': "busy", 'serviceStatus.responderId':null}});
            if(Meteor.user().username === "carOne"){
              Destinations.update(document._id, {$set:{'serviceStatus.state': "pending", 'serviceStatus.responderId':Users.findOne({username:"carTwo"})._id}});
            }else{
              Destinations.update(document._id, {$set:{'serviceStatus.state': "pending", 'serviceStatus.responderId':Users.findOne({username:"carOne"})._id}});
            }
            askedToRepond = false;
            Session.set('onMyWay', false);
          }
        }]);
      }

    }
  });
};

//Look for pending events, launch modal, update car id with closest car
var dispatchServiceEvents = function(){
  Destinations.find({'serviceStatus.state':"pending"}).observe({
    added: function(document){
      //New Situation
      var carOne = Users.findOne({username:'carOne'});
      var carTwo = Users.findOne({username:'carTwo'});
      var carOneDist = HaversineInKM(document.lat, document.lon, carOne.profile.location.latitude, carOne.profile.location.longitude);
      var carTwoDist = HaversineInKM(document.lat, document.lon, carTwo.profile.location.latitude, carTwo.profile.location.longitude);
      console.log("New Situation detected!");
      console.log("CarOneDist: ", carOneDist);
      console.log("carTwoDist: ", carTwoDist);

      var currentTime = new Date().getTime();

      if(carOneDist < carTwoDist){
        console.log("Dispatch Car one!");
        Destinations.update(document._id, {$set:{'serviceStatus.state':"pending", 'serviceStatus.responderId':carOne._id, 'serviceStatus.requestTime':currentTime}});
      }else{
        console.log("Dispatch Car two!");
        Destinations.update(document._id, {$set:{'serviceStatus.state':"pending", 'serviceStatus.responderId':carTwo._id, 'serviceStatus.requestTime':currentTime}});
      }
    }
  });
};

// Destinations.update("XaaQjPKFXocszSvr5", {$set:{'serviceStatus.state':"pending"}});
//Destinations.update("Wm58tipWpgbqJektp", {$set:{lat:37.729949}});