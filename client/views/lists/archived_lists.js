Template.archivedLists.helpers({
  lists: function() {
    // only show lists that are not archived
    return Lists.find({ archive: true }, {sort: { submitted: -1 }});
  }
});