$(document).ready(function() {
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
