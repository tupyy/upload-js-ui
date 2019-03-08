$(function () {
    $.widget("custom_ui.fileui", {
        options: {
            filename: "file",
            id: 0,
            progressValue: 0
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

            this.progressbarContainer = $("<div></div>", {
                "class": "col progress"
            }).appendTo(this.mainElement);

            this.progressbar = $("<div></div>", {
                "class": "progress-bar bg-info",
                "role": "progress-bar",
                "aria-valuemin": "0",
                "aria-valuenow": "0",
                "aria-valuemax": "100",
            }).appendTo(this.progressbarContainer);

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
            this.progressbar.css("width", this.options.progressValue + "%");
            if ( this.options.value === 100 ) {
                this._trigger( "complete", null, { value: 100 } );
            }
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

        _delete: function () {
            this._trigger("delete", event, {id: this.options.id});
        },

        _constrain: function( value ) {
            if ( value > 100 ) {
                value = 100;
            }
            if ( value < 0 ) {
                value = 0;
            }
            return value;
        }
    });

    let elem = $(".file-list-container");
    uiFiles = [];
    for (let i = 0; i < 4; i++) {
        var b = $("<div class=\"list-group-item\"></div>")
            .appendTo(elem)
            .fileui().bind("fileuidelete", function (event, data) {
                $.each(uiFiles, function (index, value) {
                    if (value.fileui('option', 'id') === data.id) {
                        uiFiles.splice(index, 1);
                        value.remove();
                        return false;
                    }
                });
            });
        b.fileui("option", 'id', i);
        uiFiles.push(b);
    }
});
