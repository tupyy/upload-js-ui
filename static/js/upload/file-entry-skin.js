$(function () {
    $.widget("photoGallery.fileUISkin", {

        _create: function () {
            this.element.addClass("upload-file");
            this.mainElement = $("<div></div>", {
                "class": "file-ui row"
            }).appendTo(this.element);

            this.label = $("<span></span>", {
                text: this.options.filename,
                "class": "col-xs-2 file-label"
            }).appendTo(this.mainElement);

            this.deleteButton = $("<button>", {
                text: "Delete",
                "class": "ui-upload-button btn btn-danger"
            }).appendTo(this.mainElement)
                .button();

            this._on(this.deleteButton, {
                click: function(e) {
                    e.preventDefault();
                    this._delete();
                }
            });
        },

        refresh: function () {
            this.label.text(this.options.filename + " " + this.options.id);
        },
    });
});
