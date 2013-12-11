Meteor.Router.add({
  '/': 'allLists',

  '/lists/:_id': {
    to: 'listItems',
    and: function(id) { Session.set('currentListId', id); }
  },

  '/create': 'createList'
});

Meteor.Router.filters({ 
  'requireLogin': function(page) {
  if (Meteor.user()) 
    return page;
  else if (Meteor.loggingIn()) 
    return 'loading';
  else
    return 'accessDenied';
  } 
});

Meteor.Router.filter('requireLogin', {only: 'createList'});