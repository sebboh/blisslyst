Template.listTitle.helpers({
  archived: function(list) {
    return list['archive'] ? 'archive' : '';
  }
});

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

Template.listTitle.rendered = function () {
  var lists = $('#iso-container').find(".list");
  var count = Lists.find().count();
  if (!$('#iso-container').hasClass("isotope")) {
        // Initialize isotope
        $('#iso-container').isotope({
          layoutMode : 'fitRows',
          filter: '.list:not(.archive)',
          getSortData: {
            creator : function($elem) {
              return $elem.attr('data-creator');
            },
            timestamp : function($elem) {
              return $elem.attr('data-timestamp');
            }
          }
        });
  }
  $('#iso-container').isotope('insert', $('#iso-container').find(".list:not(.isotope-item)"));
};

