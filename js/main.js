// app main script
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		root.app = factory(root.jQuery);
	}
}(this, function ($) {
    
    var app = {};
    
    app.prepareContent = function (cont) {
        cont = $(cont);
        $(document).trigger('preparecontent', [cont]);
        return cont;
    };
    
    $(function()
    {
        $('html').removeClass('no-js');
        app.prepareContent($(document));
    });
    
    return app;
}));