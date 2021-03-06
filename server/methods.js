Meteor.startup(function () {
  Meteor.methods({
    clearPending: function(){
      Destinations.find({'serviceStatus.state': "pending"}).forEach(function(Destination){
        Destinations.update(Destination._id, {$set:{'serviceStatus.state': "idle", 'serviceStatus.responderId':null}});
      });
      Destinations.find({'serviceStatus.state': "responding"}).forEach(function(Destination){
        Destinations.update(Destination._id, {$set:{'serviceStatus.state': "idle", 'serviceStatus.responderId':null}});
      });
      Destinations.find({'serviceStatus.state': "busy"}).forEach(function(Destination){
        Destinations.update(Destination._id, {$set:{'serviceStatus.state': "idle", 'serviceStatus.responderId':null}});
      });
    }
  });
});
