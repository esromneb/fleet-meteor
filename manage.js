if (Meteor.isClient) {
  Template.manage.rendered = function () {
    console.log('about to attach map loader from management');

      initializeCarMap();


  };
}