Router.map(function() {
  this.route('allLists', {
    path: '/',
    waitOn: function() {
      return [Meteor.subscribe('lists'),
              Meteor.subscribe('allUserData')];
    },
    onBeforeAction: 'loading'
  });

  this.route('list', {
    path: '/lists/:_id',
    waitOn: function() {
      return [Meteor.subscribe('list', this.params._id),
              Meteor.subscribe('allUserData')];
    },
    onBeforeAction: function() {
      Session.set('currentListId', this.params._id);
    }
  });

  this.route('createList', {
    path: '/new'
  });

  this.route('extension', {
    path: '/extension',
    where: 'server',
    action: function() {
      var userId = get_cookies(this.request)['meteor_userid'];
      var loginToken = get_cookies(this.request)['meteor_logintoken'];
      var user = Meteor.users.findOne({_id:userId, "services.resume.loginTokens.hashedToken":Accounts._hashLoginToken(loginToken)});
      if (user) {
        //var json = Collection.find().fetch(); // what ever data you want to return
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify('{ response: "helloworld" }'));
      }
    }
  });  

});

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    footer: {to: 'footer'}
  }
});