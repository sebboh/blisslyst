Template.list.helpers({
  currentList: function() {
    return Lists.findOne();
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
        return list.items.sort(function(a,b) { return a['checked'] - b['checked']});
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

Template.list.events({ 

  'tap, click .listItem': function(e) {
    var $target = $(e.target);
    if (!$target.is('a')) {
      var item = $target.closest( "li" ).text().trim();
      Meteor.call('toggleListItem', Session.get('currentListId'), item, function(error) { 
        if (error)
          return alert(error.reason);
      });
    }
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
    if (window.confirm("Are you sure you want to archive this list?")) {
      Meteor.call('archiveList', Session.get('currentListId'), function(error) { 
        if (error)
          return alert(error.reason);
      });
      Router.go('allLists');
    }
    else $(e.target).blur();
  },
  'click .deleteList': function(e) {
    if (window.confirm("Are you sure you want to delete this list?")) {
      Meteor.call('deleteList', Session.get('currentListId'), function(error) { 
        if (error)
          return alert(error.reason);
      });
      Router.go('allLists');
    }
    else $(e.target).blur();
  },
  'click .editList': function(e) {
    $('#deleteItemsControls').hasClass('hide') ?
      $('#deleteItemsControls').removeClass('hide') :
      $('#deleteItemsControls').addClass('hide');
    $(e.target).blur();
  },
  'click #cancelDeleteItems': function(e) {
    $('#deleteItemsControls').addClass('hide');
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

Template.list.rendered = function () {
   $.fn.editable.defaults.mode = 'inline';
   $('#listName').editable();
   $( ".listItem" ).on( "swipe", swipeItem );
    
   function swipeItem(e){
     var item = $(e.target).closest( "li" ).text().trim();
     if (window.confirm("Delete item: " + item + "?"))
      Meteor.call('deleteListItem', Session.get('currentListId'), item, function(error) { 
       if (error)
         return alert(error.reason);
      });
   }
};
