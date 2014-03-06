Template.listCard.helpers({
  archived: function(list) {
    return list['archive'] ? 'archive' : '';
  }
});

Template.listCard.events({ 
  'click .list-card': function(e) {
    var listId = $(e.target).closest('.list-card').attr('data-id');
    Router.go('list', {_id: listId});
  }
});
