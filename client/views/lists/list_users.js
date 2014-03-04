Template.listUsers.helpers({

  userList: function() {
    var list = Lists.findOne(Session.get('currentListId'));
    var userList = '';
    for (var i = 0; i < list.users.length; i++) {
      if (userList.length > 0)
        userList += ', ' + Meteor.users.findOne(list.users[i]).username;
      else
        userList = Meteor.users.findOne(list.users[i]).username;
    }
    return userList;
  },

  getUsername: function(userId) {
    return Meteor.users.findOne(userId).username;
  }

});

Template.listUsers.events({
  
  'submit #addUserForm': function(e) {
    e.preventDefault();
    
    var user = $(e.target).find('[name=user]').val();

    Meteor.call('addUserToList', Session.get('currentListId'), user, function(error) { 
    if (error)
        return alert(error.reason);
    else
        $('#addUserForm')[0].reset();
    });
  }

});

Template.listUsers.rendered = function () {
  $('.dropdown-toggle').dropdown();
  $('.dropdown-menu').find('form').click(function (e) {
    e.stopPropagation();
  });
};
