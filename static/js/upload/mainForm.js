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
            // fileUi container
            fileUIContainer: undefined,
            // filter the new add files agaist already added files
            filter: function (files) {
                let that = this;
                if (that.files === undefined) {
                    return files;
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
                    return newFiles;
                }
            },
        },
        _create: function (e) {
            let options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.find('input[type=file]');
                options.fileUIContainer = this.element.find('.file-list-container');
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
                $.when(options.filter(newFiles)).then(function (newFiles) {
                        that.options.files = that.options.files === undefined ?
                            Array.prototype.concat([], newFiles) :
                            Array.prototype.concat(that.options.files, newFiles);
                        that._addUI(newFiles);
                    }
                );
            }
        },

        /**
         * Add fileUI if there are new files
         */
        _addUI: function (newFiles) {
            let options = this.options;
            $.each(newFiles, (idx, file) => {
                let newElement = $("<div></div>").fileui();
                newElement.fileui('option', 'filename', file.name);
                newElement.appendTo(options.fileUIContainer);
            });
        }
    });
});