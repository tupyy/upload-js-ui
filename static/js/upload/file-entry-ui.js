$(function () {
    $.widget("photoGallery.fileui", $.photoGallery.fileUISkin, {
        options: {
            signed_url: undefined,
            file: undefined,
            filename: undefined,
            id: undefined
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

        guid: function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }

            return _p8() + _p8(true) + _p8(true) + _p8();
        },
        destroy: function() {
            this._off(this.element.find('.button'),'click');
            this.element.remove();
        }
    });
});