Template.allLists.helpers({
  lists: function() {
    // only show lists that are not archived
    //return Lists.find({ $or: [ { archive: {$exists: false } }, { archive: false } ] }, {sort: { submitted: -1 }});
    return Lists.find({},{sort: { submitted: -1 }});
  }
});

Template.allLists.events({
  'click .archivedLists': function(e) {
    $('#iso-container').isotope({
      filter: '.archive'
    }); 
    $('#iso-container').isotope('reLayout');
  },
  'click .activeLists': function(e) {
    $('#iso-container').isotope({
      filter: '.list:not(.archive)'
    }); 
    $('#iso-container').isotope('reLayout');
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
    $('#iso-container').isotope('reLayout');
  }
});
