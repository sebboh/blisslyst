Template.addItem.events({ 
  'submit form': function(e) {
    e.preventDefault();
    
    var item = $(e.target).find('[name=item]').val();

    Meteor.call('addListItem', Session.get('currentListId'), item, function(error) { 
    if (error)
        return alert(error.reason);
    else
        $('#addItemForm')[0].reset();
});
}
});