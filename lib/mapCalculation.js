calculateResting = function()
{
    var d = Destinations.findOne();

    var pins = Destinations.find().fetch();

//    var Haver = new HaversineAlgorithm();


    var distance = 0;

    farthestA = pins[0];
    farthestB = pins[1];

//    for( i in pins )
//    {
//        var pini = pins[i];
//
//
//
//    }

    for( i in pins )
    {
        var pini = pins[i];

//        farthestA = pini;

        for( j in pins )
        {
            var pinj = pins[j];

            if( pinj == pini )
                continue;

//            farthestB = pinj;


            var thisDist = HaversineInKM(pini.lat, pini.lon, pinj.lat, pinj.lon);

            if( thisDist > distance )
            {
                distance = thisDist;
                farthestA = pini;
                farthestB = pinj;
                console.log('found new largest'  + farthestA.lat + " , " + farthestA.lon + " - " + farthestB.lat + ", " + farthestB.lon);
            }



//            console.log(j);




//                console.log('skipping');
        }

    }
}