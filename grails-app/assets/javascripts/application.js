// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= require jquery-2.2.0.min
//= require bootstrap
//= require_tree .
//= require_self

if (typeof jQuery !== 'undefined') {
    (function ($) {
        $(document).ajaxStart(function () {
            $('#spinner').fadeIn();
        }).ajaxStop(function () {
            $('#spinner').fadeOut();
        });
    })(jQuery);
}

function createRandomInput() {
    let randoms = [];
    for (let i = 0; i < 10; i++) {
        randoms.push(Math.floor(Math.random() * 100));
    }
    $('#numbers').val(randoms.join(','));
    drawSquares(randoms);
}

function sort() {
    let numbers = $('#numbers').val();
    $.ajax({
        method: "POST",
        url: "/index/sort",
        data: {numbers: numbers}
    }).done(function (steps) {
        swap(steps);
    });
}