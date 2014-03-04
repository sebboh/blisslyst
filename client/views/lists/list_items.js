Template.listItems.helpers({
  currentList: function() {
    return Lists.findOne(Session.get('currentListId'));
  },

  listItems: function() {
    var list = Lists.findOne(Session.get('currentListId'));
    if (list.items && list.items.length > 0) {
      if (typeof list.items[0] == 'string') {
        var newList = new Array();
        for (var i=0; i<list.items.length; i++) {
          newList.push({'item': list.items[i], 'checked': 0});
        }
        Meteor.call('replaceList', Session.get('currentListId'), newList, function(error) {
          if (error)
            return alert(error.reason);
        });
        return newList;
      }
      else 
        return list.items;
    } else {
      return '';
    }
  },
  
  isChecked: function(item) {
    var itemClass = item['checked'] == 0 ? "unchecked" : "checked";
    return new Handlebars.SafeString(itemClass);
  },

  getItem: function(item) {
    return Autolinker.link(item['item'], {stripPrefix: false});
  }

});

Template.listItems.events({ 
  'mouseenter .listItem': function(e) {
      var $target = $(e.target);
      $target.find('.itemControls').removeClass('hide');
  },
  'mouseleave .listItem': function(e) {
    var $target = $(e.target);
    $target.find('.itemControls').addClass('hide');
  },
  'tap, click .listItem': function(e) {
    var $target = $(e.target);
    var item = $target.closest( "li" ).text().trim();
    Meteor.call('toggleListItem', Session.get('currentListId'), item, function(error) { 
      if (error)
        return alert(error.reason);
    });
  },
  'click .removeItem': function(e) {
    var $target = $(e.target);
    var item = $target.closest( "li" ).text().trim();
    Meteor.call('deleteListItem', Session.get('currentListId'), item, function(error) { 
      if (error)
        return alert(error.reason);
    });
  },
  'click .archiveList': function(e) {
    Meteor.call('archiveList', Session.get('currentListId'), function(error) { 
      if (error)
        return alert(error.reason);
    });
    Meteor.Router.to("/");
  },
  'click .deleteList': function(e) {
    Meteor.call('deleteList', Session.get('currentListId'), function(error) { 
      if (error)
        return alert(error.reason);
    });
    Meteor.Router.to("/");
  },
  'click .editable-submit': function(e) {
    var $input = $(e.target).parents('.form-group').find('.form-control');
    var name = $input.val();
    if (name.length < 1) {
      alert('Please enter a name, silly');
      $input.focus();
      return false;
    }
    else {
      Meteor.call('updateListName', Session.get('currentListId'), name, function(error) {
        if (error)
          return alert(error.reason);
      });
    }
  }

});

Template.listItems.rendered = function () {
   $.fn.editable.defaults.mode = 'inline';
   $('#listName').editable();
};
