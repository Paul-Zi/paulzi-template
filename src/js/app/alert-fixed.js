$(document).on('click', function (e) {
    if ($(e.target).closest('.alert-fixed').length) {
        return;
    }
    $('.alert-fixed .alert').remove();
});