$(function () {
    $.widget('photoGallery.mainForm', {
        options: {
            // input file field
            fileInput: undefined,
            // Array to hold the files
            files: undefined,
            // Holds the url signed by the server for each file
            presignedUrl: undefined,
            // collection of fileUI
            filesUI: undefined,
            // Add files to files array
            add: function (files) {
                let that = this;
                return $.Deferred(() => {
                    if (that.files === undefined) {
                        that.files = Array.prototype.concat([], files);
                    } else {
                        let newFiles = [];
                        $.each(files, function (index, file) {
                            let isNewFile = true;
                            for (let i = 0; i < that.files.length; i++) {
                                if (that.files[i].name === file.name) {
                                    isNewFile = false;
                                }
                            }
                            if (isNewFile) {
                                newFiles.push(file);
                            }
                        });
                        if (newFiles.length > 0) {
                            that.files = Array.prototype.concat(that.files, newFiles);
                        }
                    }
                }).promise();
            },
        },
        _create: function (e) {
            let options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.find('input[type=file]');
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        /**
         * Bind to input change event
         */
        _onChange: function (event) {
            let that = this,
                options = this.options,
                data = {
                    fileInput: $(event.target)
                };
            let newFiles = $.makeArray(data.fileInput.prop('files'));
            if (newFiles.length > 0) {
                $.when(options.add(newFiles)).then(function () {
                        that._addUI(options.files);
                    }
                );
            }
        },

        /**
         * Add fileUI if there are new files
         */
        _addUI: function (files) {
            let options = this.options;

        }
    });
});