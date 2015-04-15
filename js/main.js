
$(function() {

  $('.tinymce').tinymce({
    script_url: '/bower_components/tinymce/tinymce.min.js',
    //content_css : ["/public/css/main.css", '/public/bower_components/bootstrap/dist/css/bootstrap.css', '/public/bower_components/bootstrap/dist/css/bootstrap-theme.css'],
    //language: "ru",
    theme: "modern",
    convert_urls: true,
    relative_urls: false,
    document_base_url: '/',
    custom_undo_redo_levels: 100,
    valid_elements : "*[*]",
    height : 300,
    schema: "html5",
    plugins: [
      ["advlist anchor autolink autosave charmap code colorpicker contextmenu"],
      ["directionality emoticons fullscreen hr image importcss insertdatetime"],
      ["link lists media nonbreaking pagebreak paste print preview save searchreplace"],
      ["spellchecker table template textcolor wordcount visualblocks visualchars ibrowser"]
    ],
    toolbar1: 'insertfile undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fontselect fontsizeselect',
    toolbar2: 'cut copy paste | blockquote removeformat subscript superscript | link image | print preview media | forecolor backcolor emoticons | code'
  });


});


