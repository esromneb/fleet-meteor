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
                    lat:37.420408,
                    lon:-122.087717,
                    MTBF:54,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.417545,
                    lon:-122.091837,
                    MTBF:54,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.416454,
                    lon:-122.09424,
                    MTBF:54,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.418909,
                    lon:-122.093725,
                    MTBF:54,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );


            // Cluster 2
            Destinations.insert(
                {
                    lat:37.392182,
                    lon:-122.027636,
                    MTBF:54,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.392182,
                    lon:-122.021971,
                    MTBF:54,
                    status:'idle',
                    lastTimeServiced: 4992
                }
            );

            Destinations.insert(
                {
                    lat:37.385362,
                    lon:-122.024889,
                    MTBF:54,
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