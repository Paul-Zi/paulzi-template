// require.js init
requirejs.config({
    "baseUrl": "vendor",
    "paths": {
      "app": "../js",
      "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min", "jquery-1.11.2/jquery.min"],
      "jqueryui": ["http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min", "jquery-ui-1.11.4/jquery-ui.min"],
      "jqueryui/i18n": ["http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/i18n/jquery-ui-i18n.min", "jquery-ui-1.11.4/i18n/jquery-ui-i18n.min"],
      "jqueryui/datepicker-i18n-ru": ["http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/i18n/datepicker-ru.min", "jquery-ui-1.11.4/i18n/datepicker-ru.min"],
      "bootstrap": ["http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min", "bootstrap-3.3.4/js/bootstrap.min"],
    }
});

requirejs(["app/main"]);