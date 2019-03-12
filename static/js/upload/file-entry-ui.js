$(function () {
    $.widget("photoGallery.fileui", $.photoGallery.fileUISkin, {
        _delete: function () {
            this._trigger("delete", event, {id: this.options.id});
        },
    });
});