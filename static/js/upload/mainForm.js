$(function () {
    $.widget('photoGallery.mainForm', {
        options: {
            // input file field
            fileInput: undefined,
            // Define a list of dictionaries having the id of the fileUI widget, fileUI widget and file object
            data: [],
            // Holds the url signed by the server for each file
            presignedUrl: undefined,
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
            }
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
                        $.map(newFiles, function(file) {
                           let element = that._createUI(file);
                           that.options.data.push({
                               id: element.fileui('id'),
                               ui: element,
                               file: file
                           });
                        });
                    }
                );
            }
        },

        /**
         * Add fileUI if there are new files
         */
        _createUI: function (file) {
            let that = this,
                options = this.options;
            let newElement = $("<div></div>").fileui();
            newElement.fileui('option', 'filename', file.name);
            that._on(newElement.fileui(), {
                'fileuidelete': that._deleteUI
            });
            newElement.appendTo(options.fileUIContainer);
            return newElement;
        },

        _deleteUI: function (event, data) {
            let options = this.options;
            $.each(options.data, function(idx, entry) {
               if (entry.id === data.id) {
                   entry.ui.fileui('destroy');
                   options.data.splice(idx, 1);
                   return false;
               }
            });
        }
    });
});