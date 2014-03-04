if (Meteor.isServer) {
  Meteor.startup(function () {
    Lists._ensureIndex('users');
  });
}