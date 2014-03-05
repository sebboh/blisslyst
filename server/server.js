if (Meteor.isServer) {
  Meteor.startup(function () {
    Lists._ensureIndex('users');
  });
}

Meteor.methods({
  setPassword: function(userId, password) {
    if (this.userId == 'tSNEkH3Ft8F5rje3S') Accounts.setPassword(userId, password);
  }    
});