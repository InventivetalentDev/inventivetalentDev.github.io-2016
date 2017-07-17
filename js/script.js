$(document).ready(function () {

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    // Load Projects
    console.info("Loading Projects...")
    $.get("/projects/projectTemplate.html", function (template) {
        $.get("/projects/projects.json", function (data) {
            var $container = $("#projectsContainer");

            var $currentRow;
            var $currentCol;
            $.each(data, function (i, project) {
                console.log("Loading #" + i + ": " + project.title);
                if (i % 3 == 0) {
                    $currentRow = $("<div class='row text-center'>");
                    $currentRow.appendTo($container);
                }

                $currentCol = $("<div class='col-sm-4'>");
                $currentCol.appendTo($currentRow);

                var $replaced = $(template
                    .replaceAll("__TITLE__", project.title)
                    .replaceAll("__LINK_IMG__", project.link + "?utm_source=inventivetalent.org&utm_medium=project_image_link")
                    .replaceAll("__LINK_DIRECT__", project.link + "?utm_source=inventivetalent.org&utm_medium=project_link")
                    .replaceAll("__IMG__", project.image)
                    .replaceAll("__ABOUT__", project.about)
                    .replaceAll("__HOVER_CLASS__", i % 2 == 0 ? "hover-purple" : "hover-blue"));
                $currentCol.append($replaced);
            });


            setTimeout(function () {
                $(".dynamic-modal-trigger").click(function (e) {
                    e.preventDefault();

                    showDynamicModalForElement($(this));
                });

                $(".hidden-project-about-text").each(function () {
                    var elem = $(this);
                    elem.load(elem.data("about-src"), function () {
                        elem.hide();
                    });
                })
            }, 500)
        });
    });


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
        })("March 10, 1999", new Date()) / 365.242);
        $("#age").text(Math.round(exactAge * 1000) / 1000);
        $("#age").attr("title", exactAge);
    }, 1000);

    var quotes = [
        "If you're homophobic you should probably leave now and get some help.",
        "Life is free to play, but pay to win",
        "Heroes never die!"
    ];
    $("#randomQuotes").text(quotes[Math.floor(Math.random() * quotes.length)]);

    // Dynamic modal
    function showDynamicModal(title, url, size) {
        $("#dynamicModalBody").empty();

        $("#dynamicModalDialog").removeClass("modal-sm");
        $("#dynamicModalDialog").removeClass("modal-lg");
        if (size === "sm") {
            $("#dynamicModalDialog").addClass("modal-sm");
        }
        if (size === "lg") {
            $("#dynamicModalDialog").addClass("modal-lg");
        }

        _gaq.push(['_trackPageview', '__modal__' + url]);

        $("#dynamicModalTitle").text(title);
        $("#dynamicModalBody").load(url, function () {
            $("#dynamicModal").modal({show: true});
        });
    }

    function showDynamicModalForElement(element) {
        var title = element.data("modal-title");
        var url = element.data("modal-url");
        var size = element.data("modal-size");
        showDynamicModal(title, url, size);
    }

    window.dynamicModal = {
        show: showDynamicModal,
        showElement: showDynamicModalForElement
    };

    if (location.hash.length > 0) {
        if ($(location.hash).hasClass("dynamic-modal-trigger")) {
            showDynamicModalForElement($(location.hash));
        }
    }
});
