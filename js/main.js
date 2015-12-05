// app main script
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		root.app = factory(root.jQuery);
	}
}(this, function ($) {

    var app = {};

    app.contentPrepare = function (data) {
        if (typeof(data) === 'string') {
            data = $.parseHTML(data, true);
        }
        var $data = $(data);
        $(document).trigger('contentprepare', [$data]);
        return $data;
    };

    app.contentInit = function (data) {
        var $data = $(data);
        $data.trigger('contentinit', [$data]);
        return $data;
    };

    $(function () {
        $('html').removeClass('no-js');
        app.contentInit($(document));
    });

    return app;
}));