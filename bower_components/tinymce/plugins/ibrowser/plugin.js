


tinymce.PluginManager.add('ibrowser', function(editor, url) {
  editor.settings.file_browser_callback = function(id, value, type, win) {
    console.log(arguments);
  };
});


