Router.map(function() {
  this.route('allLists', {
    path: '/',
    waitOn: function() {
      return [Meteor.subscribe('lists'),
              Meteor.subscribe('allUserData')];
    }
  });

  this.route('list', {
    path: '/lists/:_id',
    waitOn: function() {
      return [Meteor.subscribe('list', this.params._id),
              Meteor.subscribe('allUserData')];
    },
    before: function() {
      Session.set('currentListId', this.params._id);
    }
  });

  this.route('createList', {
    path: '/new'
  });

});

Router.configure({
  layoutTemplate: 'layout'
});