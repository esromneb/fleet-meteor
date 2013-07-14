calculateResting = function()
{
    var d = Destinations.findOne();

    var pins = Destinations.find().fetch();




    var distance = 0;

    var farthestA = pins[0];
    var farthestB = pins[1];

    clusterA = [];
    clusterB = [];


    for( i in pins )
    {
        var pini = pins[i];


        for( j in pins )
        {
            var pinj = pins[j];

            if( pinj == pini )
                continue;


            var thisDist = HaversineInKM(pini.lat, pini.lon, pinj.lat, pinj.lon);

            if( thisDist > distance )
            {
                distance = thisDist;
                farthestA = pini;
                farthestB = pinj;
                console.log('found new largest'  + farthestA.lat + " , " + farthestA.lon + " - " + farthestB.lat + ", " + farthestB.lon);
            }

        }

    }

    for( i in pins )
    {
        var pini = pins[i];

        var distA = HaversineInKM(pini.lat, pini.lon, farthestA.lat, farthestA.lon);
        var distB = HaversineInKM(pini.lat, pini.lon, farthestB.lat, farthestB.lon);

        if( distA < distB )
            clusterA.push(pini);
        else
            clusterB.push(pini);
    }


    console.log('here__');

    console.log(JSON.stringify(clusterA));
    console.log(JSON.stringify(clusterB));


    var clusterACenter = getClusterCenter(clusterA);
    var clusterBCenter = getClusterCenter(clusterB);

    console.log(JSON.stringify(clusterACenter));
    console.log(JSON.stringify(clusterBCenter));

}

getClusterCenter = function(pins)
{
    var lat = 0.0;
    var lon = 0.0;
    console.log('here');
    for( i in pins )
    {
        var pini = pins[i];

        lat += pini.lat;
        lon += pini.lon;
    }

    var o = {};
    o.lat = lat / pins.length;
    o.lon = lon / pins.length;

    return o;
}