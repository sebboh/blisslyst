Template.themes.events({
  'click .theme': function(e) {
    $('body').css('background-image', "url('/images/" + $(e.target).data("image") + ".jpg')");
    $('.navbar-default').css('background-color', $(e.target).data("navbar"));
  }
})



