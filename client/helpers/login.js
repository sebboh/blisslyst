Meteor.loginWithPassword = _.wrap(Meteor.loginWithPassword, function(login) {

  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
      }
      return "";
  } 

  // Store the original arguments
  var args = _.toArray(arguments).slice(1),
      user = args[0],
      pass = args[1],
      origCallback = args[2];

  // Create a new callback function
  // Could also be defined elsewhere outside of this wrapped function
  var setLoginCookie = function(err) { 
    if (!err) {  
      if(Accounts.loginServicesConfigured() && Meteor.userId()) {
        setCookie("meteor_userid", Meteor.userId(),30);
        setCookie("meteor_logintoken", localStorage.getItem("Meteor.loginToken"),30);
      }
    }
  }

  // Now call the original login function with
  // the original user, pass plus the new callback
  login(user, pass, setLoginCookie);

});