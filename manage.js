if (Meteor.isClient) {
  Template.manage.rendered = function () {
    console.log('about to attach map loader from management');

      // hard wait till pins collection is avail
      setTimeout(initializeCarMap,1000);



  };
}