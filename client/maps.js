incarMapObject = null;
mapPopouts = [];

initializeCarMap = function() {
    console.log('in initializeCarMap');
    var mapOptions = {
        center: new google.maps.LatLng(37.596637,-122.400055),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    incarMapObject = new google.maps.Map(document.getElementById("car-map-canvas"), mapOptions);

    populateCarMapPins();
    showCarPositionsWithMarkers();
//    calculateResting();
};


Template.incarMap.rendered = function () {
  console.log('about to attach map loader from car');

  initializeCarMap();

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


markPinAsPending = function(pin)
{
    console.log('marking pin with id' + pin._id);
    Destinations.update(pin._id, {$set: { serviceStatus:{ state:'pending'} }});
};

populateCarMapPins = function()
{
    var d = Destinations.findOne();

    var pins = Destinations.find().fetch();

    var incar = Session.get('mapIsInCar');

    for( x in pins )
    {

        (function()
        {
            var pin = pins[x];

            var contentHtml = "" + pin.lat + "," + pin.lon;

            if( !incar )
            {
                contentHtml = "lol ios";//"<img src='/public/img/63-runner.png'/>";
            }

            // callout window (content can be full html)
            var infowindow = new google.maps.InfoWindow({
                content: contentHtml
            });

            mapPopouts.push(infowindow);

            var pinLatlng = new google.maps.LatLng(pin.lat, pin.lon);
            var marker = new google.maps.Marker({
                position: pinLatlng,
                title:"",
                draggable:true
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
  var userOne = Users.findOne({username:"carOne"});
  var carOneStartPos = {latitude:0,longitude:0};
  if(userOne && userOne.profile && userOne.profile.location)
  {
    carOneStartPos = Users.findOne({username:"carOne"}).profile.location;
  }
  var carOneLatlng = new google.maps.LatLng(carOneStartPos.latitude, carOneStartPos.longitude);

  var carOneMarker = new google.maps.Marker({
    position: carOneLatlng,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      strokeColor: '#F00',
//      fillColor: '#FFF',
//      fillOpacity: 1
    },
    title:"Car One",
    map:incarMapObject
  });

  //CarTwo
  var userTwo = Users.findOne({username:"carTwo"});
  var carTwoStartPos = {latitude:0,longitude:0};
  if( userTwo && userTwo.profile && userTwo.profile.location )
  {
    carTwoStartPos = Users.findOne({username:"carTwo"}).profile.location;
  }
  var carTwoLatlng = new google.maps.LatLng(carTwoStartPos.latitude, carTwoStartPos.longitude);
  var carTwoMarker = new google.maps.Marker({
    position: carTwoLatlng,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      strokeColor: '#00F',
//      fillColor: '#00F',
//      fillOpacity: 1
    },
    title:"Car Two",
    map:incarMapObject
  });


  //RestOne
  var restOneStartPos = {latitude:0,longitude:0};
  if(userOne && userOne.profile && userOne.profile.location)
  {
    restOneStartPos = Users.findOne({username:"carOne"}).profile.restingLocation;
  }

  var restOneLatlng = new google.maps.LatLng(restOneStartPos.latitude, restOneStartPos.longitude);

    var circleOneOptions = {
        strokeColor: '#F00',
        strokeOpacity: 0.0,
        strokeWeight: 0,
        fillColor: '#F00',
        fillOpacity: 0.33,
        map: incarMapObject,
        center: restOneLatlng,
        radius: 500
    };

    var restOneMarker = new google.maps.Circle(circleOneOptions);

    //RestTwo
    var restTwoStartPos = {latitude:0,longitude:0};
    if( userTwo && userTwo.profile && userTwo.profile.location )
    {
        restTwoStartPos = Users.findOne({username:"carTwo"}).profile.restingLocation;
    }

    var restTwoLatlng = new google.maps.LatLng(restTwoStartPos.latitude, restTwoStartPos.longitude);

    var circleTwoOptions = {
        strokeColor: '#00F',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#00F',
        fillOpacity: 0.33,
        map: incarMapObject,
        center: restTwoLatlng,
        radius: 500
    };

    var restTwoMarker = new google.maps.Circle(circleTwoOptions);

    var carOneAddedOrChanged = function(id, fields)
    {
        if(fields.profile && fields.profile.location){
            var carOneLatlng = new google.maps.LatLng(fields.profile.location.latitude, fields.profile.location.longitude);
            carOneMarker.setPosition(carOneLatlng);
        }

        if(fields.profile && fields.profile.restingLocation){
            var restOneLatlng = new google.maps.LatLng(fields.profile.restingLocation.latitude, fields.profile.restingLocation.longitude);
            restOneMarker.setCenter(restOneLatlng);
        }
    };

    var carTwoAddedOrChanged = function(id, fields)
    {
        if(fields.profile && fields.profile.location){
            var carTwoLatlng = new google.maps.LatLng(fields.profile.location.latitude, fields.profile.location.longitude);
            carTwoMarker.setPosition(carTwoLatlng);
        }

        if(fields.profile && fields.profile.restingLocation){
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
