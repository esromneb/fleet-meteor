Meteor.Router.add('/env/:baseUrl', function(baseUrl) {
 Session.set('baseUrl', baseUrl);
    Session.set('mapIsInCar', true);
  console.log(baseUrl);
  return "GMDash";
});

Meteor.Router.add('/', function(baseUrl) {
    Session.set('mapIsInCar', false);
  return "manage";
});
