var debugLocation = false;

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
                if( debugLocation )
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


    if( debugLocation )
    {
        console.log(JSON.stringify(clusterA));
        console.log(JSON.stringify(clusterB));
    }


    var clusterACenter = getClusterCenter(clusterA);
    var clusterBCenter = getClusterCenter(clusterB);

    if( debugLocation )
    {
        console.log(JSON.stringify(clusterACenter));
        console.log(JSON.stringify(clusterBCenter));
    }

    // now we have both centers time to save to user object

    var allUsers = Users.find().fetch();
    var userA = allUsers[0];
    var userB = allUsers[1];

    var distUserAFromA = HaversineInKM(userA.profile.location.latitude, userA.profile.location.longitude, clusterACenter.lat, clusterACenter.lon);
    var distUserAFromB = HaversineInKM(userA.profile.location.latitude, userA.profile.location.longitude, clusterBCenter.lat, clusterBCenter.lon);
    var distUserBFromA = HaversineInKM(userB.profile.location.latitude, userB.profile.location.longitude, clusterACenter.lat, clusterACenter.lon);
    var distUserBFromB = HaversineInKM(userB.profile.location.latitude, userB.profile.location.longitude, clusterBCenter.lat, clusterBCenter.lon);

    if( debugLocation )
    {
        console.log('dist from ' + userA.username + " " + distUserAFromA);
        console.log('dist from ' + userB.username + " " + distUserAFromB);
        console.log('dist from ' + userA.username + " " + distUserBFromA);
        console.log('dist from ' + userB.username + " " + distUserBFromB);
    }

    var clusterCenterForUserA = clusterBCenter;
    var clusterCenterForUserB = clusterACenter;
    if( distUserAFromA < distUserAFromB )
    {
        clusterCenterForUserA = clusterACenter;
        clusterCenterForUserB = clusterBCenter;
    }


    Users.update(userA._id, {
        $set:
        {
            'profile.restingLocation': {latitude: clusterCenterForUserA.lat, longitude: clusterCenterForUserA.lon}
        }
    });

    Users.update(userB._id, {
        $set:
        {
            'profile.restingLocation': {latitude: clusterCenterForUserB.lat, longitude: clusterCenterForUserB.lon}
        }
    });



}

getClusterCenter = function(pins)
{
    var lat = 0.0;
    var lon = 0.0;

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


calculateLoop = function()
{
    var allUsers = Users.find().fetch();


    var allUsersHaveLoc = true;

    for( x in allUsers )
    {
        var user = allUsers[x];

        if(! (user.profile && user.profile.location && user.profile.location.latitude))
        {
            allUsersHaveLoc = false;
        }
    }

    if(allUsersHaveLoc)
    {
        calculateResting();
    }


    Meteor.setTimeout(calculateLoop, 1000);
}