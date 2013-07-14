incarMapObject = null;

initializeCarMap = function() {
    var mapOptions = {
        center: new google.maps.LatLng(37.418909, -122.093725),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    incarMapObject = new google.maps.Map(document.getElementById("car-map-canvas"), mapOptions);

    populateCarMapPins();
    calculateResting();
}



if( Meteor.isClient )
{
    $(document).ready(function(){
        console.log('about to attach map loader');
        google.maps.event.addDomListener(window, 'load', initializeCarMap);
    });
}

mapPopouts = [];

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