$(function () {
    $.widget("photoGallery.fileui", $.photoGallery.fileuiSkin, {
        _delete: function () {
            this._trigger("delete", event, {id: this.options.id});
        },
    });
});