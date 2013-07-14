incarMapObject = null;

initializeCarMap = function() {
    var mapOptions = {
        center: new google.maps.LatLng(37.397, -120.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    incarMapObject = new google.maps.Map(document.getElementById("car-map-canvas"), mapOptions);

    populateCarMapPins();
}

if( Meteor.isClient )
{
    $(document).ready(function(){
        console.log('about to attach map loader');
        google.maps.event.addDomListener(window, 'load', initializeCarMap);
    });
}

populateCarMapPins = function()
{
    var d = Destinations.findOne();

    var pins = Destinations.find().fetch();

    for( x in pins )
    {
        var pin = pins[x];

        var pinLatlng = new google.maps.LatLng(pin.lat, pin.lon);
        var marker = new google.maps.Marker({
            position: pinLatlng,
            title:""
        });

        // To add the marker to the map, call setMap();
        marker.setMap(incarMapObject);

    }

//    console.log(d);



}