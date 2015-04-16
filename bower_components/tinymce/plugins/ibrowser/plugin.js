


tinymce.PluginManager.add('ibrowser', function(editor, url) {
  //console.log(arguments);
  var filesListTemplate = _.template($('#files_list_template').html());

  editor.settings.file_browser_callback = function(id, value, type, win) {
    //console.log(arguments);
    $.get('/filesList', {folder: '/storage'}, function(data) {
      var treePanel = {
        type: 'container',
        minHeight: 500,
        minWidth: 800,
        html: filesListTemplate({files: data.files})
      };

      win = tinymce.activeEditor.windowManager.open({
        title: 'Insert something',
        items: [treePanel],
        buttons: [
          {
            text: "Cancel",
            onclick: function() {
              win.close();
            }
          }
        ]
      });

      $('#' + win._id + ' .files_list .item').on('click', function() {
        var $item = $(this);

        if($item.data('type') == 'file') {
          var data = {
            src: $item.data('filePath')
          };
          editor.focus();
          editor.selection.setContent(editor.dom.createHTML('img', data));
          win.close();
          tinymce.activeEditor.windowManager.windows.forEach(function(window) {
            window.close();
          });
        } else {

        }
      });

    });
  };

});


