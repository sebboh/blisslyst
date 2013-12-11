Template.createList.events({ 
  'submit form': function(e) {
    e.preventDefault();
    
    var list = {
      listName: $(e.target).find('[name=listName]').val()
    }

    Meteor.call('createList', list, function(error, id) { 
      if (error)
        return alert(error.reason);

      Meteor.Router.to('listItems', id); 
    });
  }
});