Package.describe({
  summary: "jquery-mobile touch events packaged for Meteor"
});

Package.on_use(function (api) {
  api.use('jquery', 'client');
  api.imply('jquery', 'client');  
  api.add_files("jquery.mobile.custom.js", 'client');
});