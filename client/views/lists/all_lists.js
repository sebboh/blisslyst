Template.allLists.helpers({
  lists: function() {
    // only show lists that are not archived
    return Lists.find({ $or: [ { archive: {$exists: false } }, { archive: false } ] }, {sort: { submitted: -1 }});
  }
});