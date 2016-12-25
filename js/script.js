$(document).ready(function () {
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // http://stackoverflow.com/questions/32331471/writing-my-age-in-decimal-format
    setInterval(function () {
        var exactAge = ((function (d1, d2) {
            var diffDays, oneDay;
            oneDay = 24 * 60 * 60 * 1000;
            diffDays = (d2 - Date.parse(d1)) / oneDay;
            return diffDays;
        })("March 10, 1999", new Date()) / 365);
        $("#age").text(Math.round(exactAge * 1000) / 1000);
        $("#age").attr("title", exactAge);
    }, 1000);

    var quotes = [
        "If you're homophobic you should probably leave now and get some help."
    ];
    $("#randomQuotes").text(quotes[Math.floor(Math.random() * quotes.length)]);

    // Dynamic modal
    function showDynamicModalFromUrl(title, url) {
        $("#dynamicModalTitle").text(title);
        $("#dynamicModalBody").load(url);
    }

    function showDynamicModal(title, body) {
        $("#dynamicModalTitle").text(title);
        $("#dynamicModalBody").html(body);
    }

    $(".dynamic-modal-trigger").click(function (e) {
        e.preventDefault();

        var title = $(this).data("modal-title");
        var url = $(this).data("modal-url");
        showDynamicModalFromUrl(title, url);
    });
});
