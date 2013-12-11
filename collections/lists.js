Lists = new Meteor.Collection('lists');

Lists.allow({
  insert: function(userId, doc) {
    // only allow listing if you are logged in
    return !! userId; 
  }
});

Meteor.methods({
  createList: function(listAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, 'You need to login to create new lists');

    // ensure the list has a name
    if (!listAttributes.listName)
      throw new Meteor.Error(422, 'Please fill in a name');

    // pick out the whitelisted keys
    var list = _.extend(_.pick(listAttributes, 'listName'), { userId: user._id,
      creator: user.username,
      submitted: new Date().getTime()
    });

    var listId = Lists.insert(list);
    
    return listId; 
  }
});