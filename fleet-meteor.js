if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to fleet-meteor.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.audioTestButtons.rendered = function() {
    initAutoTestButtons();
  }

  // init();
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
