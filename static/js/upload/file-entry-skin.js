$(function () {
    $.widget("photoGallery.fileUISkin", {
        options: {
            filename: "file",
            id: 0
        },

        _create: function () {
            this.options.value = this._constrain(this.options.progressValue);
            this.element.addClass("upload-file");
            this.mainElement = $("<div></div>", {
                "class": "file-ui row"
            }).appendTo(this.element);

            this.label = $("<span></span>", {
                text: this.filename,
                "class": "col-xs-2 file-label"
            }).appendTo(this.mainElement);

            this.deleteButton = $("<button>", {
                text: "Delete",
                "class": "ui-upload-button btn btn-danger"
            }).appendTo(this.mainElement)
                .button();

            this._on(this.deleteButton, {
                click: "_delete"
            });
        },

        refresh: function () {
            this.label.text(this.options.filename + " " + this.options.id);
        },

        _setOption: function (key, value) {
            if (key === "value") {
                value = this._constrain(value);
            }
            this._super(key, value);
            this.refresh();
        },

        _setOptions: function (options) {
            this._super(options);
            this.refresh();
        },

        _constrain: function (value) {
            if (value > 100) {
                value = 100;
            }
            if (value < 0) {
                value = 0;
            }
            return value;
        }
    });
});
