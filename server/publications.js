Meteor.publish('lists', function() {
  if (this.userId)
    return Lists.find({'users': this.userId});
  else
    return Lists.find({'users': ''});
});

Meteor.publish('list', function(listId) {
  if (this.userId)
    return Lists.find({'users': this.userId, _id: listId});
});

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'username': 1, '_id': 1}});
});