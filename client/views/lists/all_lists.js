Template.allLists.helpers({
  lists: function() {
    // only show lists that are not archived
    //return Lists.find({ $or: [ { archive: {$exists: false } }, { archive: false } ] }, {sort: { submitted: -1 }});
    return Lists.find({},{sort: { submitted: -1 }});
  }
});

Template.allLists.events({
  'click #archivedLists': function(e) {
    $('#iso-container').isotope({
      filter: '.archive'
    }); 
    $('#iso-container').isotope('reLayout');
  },
  'click #activeLists': function(e) {
    $('#iso-container').isotope({
      filter: '.list:not(.archive)'
    }); 
    $('#iso-container').isotope('reLayout');
  }
});