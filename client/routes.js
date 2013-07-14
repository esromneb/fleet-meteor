Meteor.Router.add('/env/:baseUrl', function(baseUrl) {
 Session.set('baseUrl', baseUrl);
  console.log(baseUrl);
});
