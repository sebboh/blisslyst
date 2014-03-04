Package.describe({
  summary: "Editable forms with X-editable: http://vitalets.github.io/x-editable/index.html"
});

Package.on_use(function (api) {
  api.use('jquery', 'client');
  api.imply('jquery', 'client');  
  api.add_files(["bootstrap-editable.js",
    "bootstrap-editable.css",
    "lib/clear.png",
    "lib/loading.gif"], 'client');
});