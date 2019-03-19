$(function () {
    $.widget("photoGallery.fileui", $.photoGallery.fileUISkin, {
        options: {
            signed_url: undefined,
            file: undefined,
            filename: undefined,
            id: undefined,
            progress: 0
        },
        _create: function () {
            this._super();
            this.options.id = this.guid();
        },
        _delete: function () {
            this._trigger("delete", event, {id: this.options.id});
        },

        _setOption: function (key, value) {
            this._super(key, value);
            this.refresh();
        },

        _setOptions: function (options) {
            this._super(options);
            this.refresh();
        },

        upload: function () {
            let o = this.options;
            let jqXHR = $.ajax(o).done(function () {
                console.log("upload complete")
            }).fail(function (result, textStatus, jqXHR) {
                console.log(result);
            })
        },
        setSignedUrl: function (signed_url) {
            this.options.signed_url = signed_url;
            this._initXHRData(signed_url);
        },
        _initXHRData: function (signed_url) {
            const postData = new FormData();
            postData.append('file', this.options.file);
            this.options.headers = {'Content-type': this.options.file.type};
            this.options.data = postData;
            this.options.processData = false;
            this.options.type = 'PUT';
            this.options.url = signed_url;
        },

        send: function () {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 204) {
                        console.log('ok')
                    } else {
                        alert('Could not upload file.');
                    }
                }
            };
            const self = this;
            xhr.upload.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded * 100) / e.total);
                    self.refresh(progress);
                }
            }, false);

            xhr.upload.addEventListener("load", function (e) {
                self.refresh(100);
            }, false);

            xhr.open('PUT', this.options.url, true);
            xhr.setRequestHeader('Content-type', this.options.file.type);
            xhr.overrideMimeType(this.options.file.type);
            xhr.send(this.options.file);
        },

        guid: function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }

            return _p8() + _p8(true) + _p8(true) + _p8();
        }
        ,
        destroy: function () {
            this._off(this.element.find('.button'), 'click');
            this.element.remove();
        }
    })
    ;
});