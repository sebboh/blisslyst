Lists = new Mongo.Collection('lists');

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
      items: [],
      users: [ user._id ]
    });

    var listId = Lists.insert(list);
    
    return listId; 
  },

  verifyList: function(listId) {
    var list = Lists.findOne(listId);
    if (! list )
      throw new Meteor.Error(404, "List not found");
    return list;
  },

  archiveList: function(listId) {
    Lists.update(listId, {$set: { archive: true }})
  },

  deleteList: function(listId) {
    Lists.remove(listId);
  },

  addListItem: function(listId, item) {
    Meteor.call('verifyList', listId);
    item = item.trim();
    if(item.substr(-1) == '/')
      item = item.substr(0, item.length - 1);
    Lists.update(listId, { $addToSet: {items: {'item': item, 'checked': 0}}});
  },

  deleteListItem: function(listId, item) {
    Meteor.call('verifyList', listId);
    Lists.update( listId, { $pull: { items: {item: item }}});
  },

  replaceList: function(listId, newList) {
    Meteor.call('verifyList', listId);
    Lists.update(listId, {$set: { items: newList }});
  },

  toggleListItem: function(listId, item) {
    var list = Meteor.call('verifyList', listId);
    var checked = 0;
    list.items.some(function(i) {
      if (i['item'] == item) {
        checked = (i['checked'] == 0) ? 1 : 0;
        return true;
      }
    });
    Lists.update({_id: listId, 'items.item': item }, {$set: { 'items.$.checked': checked}});
  },

  updateListName: function(listId, name) {
    Meteor.call('verifyList', listId);
    Lists.update( listId, {$set: {listName: name}});
  },

  addUserToList: function(listId, username) {
    var user = Meteor.users.findOne({username: username});
    if (!user)
      throw new Meteor.Error(404, "User not found");
    Lists.update(listId, { $addToSet: { users: user._id } } );
  }

});