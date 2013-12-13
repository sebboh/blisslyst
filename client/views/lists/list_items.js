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

Template.listItems.events({ 
  'mouseenter .listItem': function(e) {
      var $target = $(e.target);
      $target.find('a').removeClass('hide');
  },
  'mouseleave .listItem': function(e) {
    var $target = $(e.target);
    $target.find('a').addClass('hide');
  },
  'click .removeItem': function(e) {
    var $target = $(e.target);
    var item = $target.closest( "li" ).text();
    Meteor.call('deleteListItem', Session.get('currentListId'), item, function(error) { 
      if (error)
        return alert(error.reason);
    });
  }
});
