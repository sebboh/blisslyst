Template.allLists.helpers({
  lists: function() {
    var lists = Lists.find({},{sort: { submitted: -1 }});
    if (lists.count() > 0)
      return lists;
    else
      return '';
  }
});

Template.allLists.events({
  'click .archivedLists': function(e) {
    $('#iso-container').isotope({
      filter: '.archive'
    }); 
  },
  'click .activeLists': function(e) {
    $('#iso-container').isotope({
      filter: '.list-card:not(.archive)'
    }); 
  },
  'click #sortByDate': function(e) {
    var directionIcon = $(e.target).find('i');
    var directionAsc = directionIcon.hasClass('fa-sort-asc');
    directionAsc ? 
      directionIcon.removeClass('fa-sort-asc').addClass('fa-sort-desc') :
      directionIcon.removeClass('fa-sort-desc').addClass('fa-sort-asc');
    $(e.target).blur();
    $('#iso-container').isotope({
      sortBy: 'timestamp',
      sortAscending: directionAsc,
    }); 
  }
});

Template.allLists.rendered = function () {
  if (!$('#iso-container').hasClass("isotope")) {
        // Initialize isotope
        $('#iso-container').isotope({
          layoutMode : 'fitRows',
          filter: '.list-card:not(.archive)',
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
};
