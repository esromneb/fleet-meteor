//Accounts.onCreateUser(function(options, user) {
//  options.profile.currentLocation = {};
//  options.profile.restPoint = {};
//  if (options.profile)
//    user.profile = options.profile;
//  return user;
//});


Meteor.startup(function () {
    if (Meteor.isServer) {
        if(!Destinations.findOne() )
        {
            // Cluster 1
            Destinations.insert(
                {
                    lat:37.775824,
                    lon:-122.495499,
                    MTBF:100,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.750854,
                    lon:-122.484512,
                    MTBF:100,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.772296,
                    lon:-122.431641,
                    MTBF:100,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.729949,
                    lon:-122.387695,
                    MTBF:30,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );


            // Cluster 2
            Destinations.insert(
                {
                    lat:37.516075,
                    lon:-122.287445,
                    MTBF:100,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.483389,
                    lon:-122.240753,
                    MTBF:100,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.467041,
                    lon:-122.183075,
                    MTBF:100,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );


        }

      if(!Users.findOne() )
      {
        Accounts.createUser({username:'carOne', password:'pass'});
        Accounts.createUser({username:'carTwo', password:'pass'});
        Accounts.createUser({username:'carThree', password:'pass'});
      }
    }
});