Template.listTitle.events({ 
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
