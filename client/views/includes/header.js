Template.header.rendered = function () {

  //collapse navbar when clicking new list or navbar brand
  $('#new-list, .navbar-brand').on('click', function(){
    if($('.navbar-toggle').css('display') !='none'){
      $(".navbar-toggle").trigger( "click" );
    }
  });

}