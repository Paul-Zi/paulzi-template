import "../sass/app.scss";
import "../pug/index.pug";

//import "./vendor";

$(() => {
    $(document).trigger('contentinit', [$(document)]);
});