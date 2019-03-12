$(function() {
     $.widget('photoGallery.mainForm', {
       options: {
           fileInput: undefined,
           add: function (e, data) {
               if (e.isDefaultPrevented()) {
                   return false;
               }
           },
       },
        _create: function (e) {
           let options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.find('input[type=file]');
            }
        }
    });
});