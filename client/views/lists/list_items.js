Template.listItems.helpers({
  currentList: function() {
    return Lists.findOne(Session.get('currentListId'));
  },

  listItems: function() {
    var list = Lists.findOne(Session.get('currentListId'));
    if (list.items && list.items.length > 0) {
      return list.items;
    } else {
      return '';
    }
  }
});
