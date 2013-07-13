Accounts.onCreateUser(function(options, user) {
  options.profile.currentLocation = {};
  options.profile.restPoint = {};
  if (options.profile)
    user.profile = options.profile;
  return user;
});
