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
      submitted: new Date().getTime(),
      items: []
    });

    var listId = Lists.insert(list);
    
    return listId; 
  },

  deleteList: function(listId) {
    Lists.remove(listId);
  },

  addListItem: function(listId, item) {
    var list = Lists.findOne(listId);
    if (! list )
      throw new Meteor.Error(404, "List not found");
    Lists.update(listId, { $addToSet: {items: item}});
  },

  deleteListItem: function(listId, item) {
    var list = Lists.findOne(listId);
    if (! list )
      throw new Meteor.Error(404, "List not found");
    Lists.update( { items: item }, { $pull: { items: item }});
  }

});