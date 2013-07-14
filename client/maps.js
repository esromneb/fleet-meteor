incarMapObject = null;
mapPopouts = [];

initializeCarMap = function() {
    var mapOptions = {
        center: new google.maps.LatLng(37.596637,-122.400055),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    incarMapObject = new google.maps.Map(document.getElementById("car-map-canvas"), mapOptions);

    populateCarMapPins();
    showCarPositionsWithMarkers();
    calculateResting();
}

Template.incarMap.rendered = function () {
  console.log('about to attach map loader');
  google.maps.event.addDomListener(window, 'load', initializeCarMap);

  //Live update Car location into DB
  Meteor.setInterval(function(){
    if(Meteor.user()){
      gm.info.getCurrentPosition(function(Position){
        if(Position && Position.coords){
          Users.update(Meteor.userId(), {$set: { 'profile.location': {latitude: Position.coords.latitude * 0.000000277777777778, longitude: Position.coords.longitude * 0.000000277777777778} }});
        }
      });
    }

  }, 200);
};

populateCarMapPins = function()
{
    var d = Destinations.findOne();

    var pins = Destinations.find().fetch();

    for( x in pins )
    {

        (function()
        {
            var pin = pins[x];

            // callout window (content can be full html)
            var infowindow = new google.maps.InfoWindow({
                content: "" + pin.lat + "," + pin.lon
            });

            mapPopouts.push(infowindow);

            var pinLatlng = new google.maps.LatLng(pin.lat, pin.lon);
            var marker = new google.maps.Marker({
                position: pinLatlng,
                title:""
            });

            // wire click for pin
            google.maps.event.addListener(marker, 'click', function() {

                for( x in mapPopouts )
                {
                    var popout = mapPopouts[x];
                    popout.close();
                }
                infowindow.open(incarMapObject,marker);
            });

            // To add the marker to the map, call setMap();
            marker.setMap(incarMapObject);
        }).call(this);
    }

//    console.log(d);
}

showCarPositionsWithMarkers = function()
{
  //CarOne
  var carOneStartPos = Users.findOne({username:"carOne"}).profile.location;
  var carOneLatlng = new google.maps.LatLng(carOneStartPos.latitude, carOneStartPos.longitude);
  console.log("CAR one init pos: ", carOneStartPos);
  var carOneMarker = new google.maps.Marker({
    position: carOneLatlng,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      strokeColor: '#00F',
      fillColor: '#FFF',
      fillOpacity: 1
    },
    title:"Car One",
    map:incarMapObject
  });

  //CarTwo
  var carTwoStartPos = Users.findOne({username:"carTwo"}).profile.location;
  var carTwoLatlng = new google.maps.LatLng(carTwoStartPos.latitude, carTwoStartPos.longitude);
  var carTwoMarker = new google.maps.Marker({
    position: carTwoLatlng,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      strokeColor: '#FFF',
      fillColor: '#00F',
      fillOpacity: 1
    },
    title:"Car Two",
    map:incarMapObject
  });


  //RestOne
  var restOneStartPos = Users.findOne({username:"carOne"}).profile.restingLocation;
  var restOneLatlng = new google.maps.LatLng(restOneStartPos.latitude, restOneStartPos.longitude);

    var circleOneOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.0,
        strokeWeight: 0,
        fillColor: '#0000FF',
        fillOpacity: 0.25,
        map: incarMapObject,
        center: restOneLatlng,
        radius: 500
    };

    var restOneMarker = new google.maps.Circle(circleOneOptions);

    //RestTwo
    var restTwoStartPos = Users.findOne({username:"carTwo"}).profile.restingLocation;
    var restTwoLatlng = new google.maps.LatLng(restTwoStartPos.latitude, restTwoStartPos.longitude);

    var circleTwoOptions = {
        strokeColor: '#00F',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#DDD',
        fillOpacity: 0.66,
        map: incarMapObject,
        center: restTwoLatlng,
        radius: 500
    };

    var restTwoMarker = new google.maps.Circle(circleTwoOptions);

    var carOneAddedOrChanged = function(id, fields)
    {
        if(fields.profile.location){
            var carOneLatlng = new google.maps.LatLng(fields.profile.location.latitude, fields.profile.location.longitude);
            carOneMarker.setPosition(carOneLatlng);

            var restOneLatlng = new google.maps.LatLng(fields.profile.restingLocation.latitude, fields.profile.restingLocation.longitude);
            restOneMarker.setCenter(restOneLatlng);
        }
    };

    var carTwoAddedOrChanged = function(id, fields)
    {
        if(fields.profile.location){
            var carTwoLatlng = new google.maps.LatLng(fields.profile.location.latitude, fields.profile.location.longitude);
            carTwoMarker.setPosition(carTwoLatlng);

            var restTwoLatlng = new google.maps.LatLng(fields.profile.restingLocation.latitude, fields.profile.restingLocation.longitude);
            restTwoMarker.setCenter(restTwoLatlng);
        }
    };

  Users.find({username:"carOne"}).observeChanges({
    added: carOneAddedOrChanged,
    changed: carOneAddedOrChanged
  });

  Users.find({username:"carTwo"}).observeChanges({
    added: carTwoAddedOrChanged,
    changed: carTwoAddedOrChanged
  });

}