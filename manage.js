if (Meteor.isClient) {
  Template.manage.rendered = function () {
    console.log('about to attach map loader');
    google.maps.event.addDomListener(window, 'load', initializeCarMap);

  };
}