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
  'mouseover .listItem': function(e) {
      var $target = $(e.target);
      $target.find('a').removeClass('hide');
  },
  'mouseout .listItem': function(e) {
    var $target = $(e.target);
    $target.find('a').addClass('hide');
  }/*
  ,
  'click .removeItem': function(e) {
    var $target = $(e.target);
    $target.parent().html();
    return alert($target.parent().html());
  }*/

});