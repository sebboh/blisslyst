Meteor.publish('lists', function() {
  if (this.userId)
    return Lists.find({'users': this.userId});
});

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'username': 1, '_id': 1}});
});