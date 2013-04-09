(function () {
    /*globals Reveal:false, hljs:false */

    var snippet          = window.snippet          = {},
        twoFaceContainer = window.twoFaceContainer = {},
        currentFace      = window.currentFace      = {},
        currentRotation  = window.currentRotation   = {};

    var iframeSelector = ".inner-container.demo > iframe.content";

    function degreeFromRotationCss(css) {
        try {
            return +css.match(/rotateY\((\-?\d)deg\)/)[1];
        } catch (e) {
            return 0;
        }
    }
    
    function rotationCssFromDegree(deg) {
        return "rotateY(" + deg + "deg)";
    }

    function changeFace(slideKey) {
        slideKey = slideKey || currentSlideKey();
        if (!twoFaceContainer[slideKey]) {
            logger.error("This slide has no code");
            return;
        }

        var oldFace = currentFace[slideKey],
            newFace = oldFace === "code" ? "demo" : "code",
            container = twoFaceContainer[slideKey],
            oldRotation = currentRotation[slideKey],
            // to make the two-face rotate in the same direction:
            //newRotation = oldRotation - 180;
            // to have it go into demo mode and come back:
            newRotation = oldFace === "code" ? oldRotation - 180 : oldRotation + 180;

        currentFace[slideKey] = newFace;
        currentRotation[slideKey] = newRotation;

        if (newFace === "demo") {
            twoFaceContainer[slideKey]
                .find(iframeSelector)
                .contents()
                .find("body")
                .html(snippet[slideKey]);
        }
        container.css("-webkit-transform", rotationCssFromDegree(newRotation));
    }
    window.changeFace = changeFace;

    function changeAllFaces() {
        Object.keys(twoFaceContainer).forEach(changeFace);
    }
    window.changeAllFaces = changeAllFaces;

    function makeSlideKey(indices) {
        return String(indices.h) + "/" + String(indices.v);
    }

    function currentSlideKey() {
        return makeSlideKey(Reveal.getIndices());
    }

    function slideKeyFromBlock(block) {
        var hSection = block.closest(".reveal > .slides > section"),
            vSection = block.closest(".reveal > .slides > section > section"),
            h = (hSection.length && hSection.index()) || 0,
            v = (vSection.length && vSection.index()) || 0;
        return makeSlideKey({ h: h, v: v });
    }

    function highlightLoaded() {
        $(document).ready(function () {
            $(".two-face .face .change-face").click(function () {
                changeFace();
            });

            $(".two-face").each(function () {
                var container = $(this),
                    slideKey = slideKeyFromBlock(container),
                    codeBlock = container.find(".inner-container code"),
                    demoFrame = container.find(".inner-container.demo iframe");

                twoFaceContainer[slideKey] = container;

                // html encode the block contents into strings
                // (because they've been put in as html tags in the source)
                codeBlock.text(codeBlock.html().trim());

                snippet[slideKey] = codeBlock.text();
                currentFace[slideKey] = "code";
                currentRotation[slideKey] = 0;

                codeBlock.on("focusout", function () {
                    snippet[slideKey] = codeBlock.text();
                });

                hljs.highlightBlock(codeBlock[0]);

                demoFrame.contents().find("head")
                    .append("<link rel='stylesheet' href='lib/css/reset.css'>")
                    //.append("<link rel='stylesheet' href='lib/css/bootstrap.css'>")
                    .append("<link rel='stylesheet' href='css/demo-iframe.css'>");
            });

            // show body once the slides' custom code has been parsed
            $("body").show();
            if ($.browser.chrome || $.browser.webkit) {
                $("body > .reveal").fadeIn("slow");
            } else {
                logger.error("Please use a webkit browser (Chrome / Safari)");
            }
        });
    }

    var humane = window.humane;
    var logger = window.logger = humane.create({
        baseCls: "humane-jackedup",
        timeout: 3000
    });
    logger.success = logger.spawn({
        addnCls: "humane-jackedup-success",
        timeout: 1000
    });
    logger.error = logger.spawn({
        addnCls: "humane-jackedup-error",
        timeout: 4000
    });
    logger.info = logger.spawn({
        addnCls: "humane-jackedup-info",
        timeout: 1000
    });

    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        keyboard: true,
        overview: true,
        loop: false,
        rtl: false,
        autoSlide: 0,
        rollingLinks: true,

        theme: "sky",
        transition: "default",

        // Optional libraries used to extend on reveal.js
        dependencies: [
            {
                src: "lib/js/classList.js",
                condition: function () { return !document.body.classList; }
            },
            {
                src: "plugin/highlight/highlight.js",
                async: true,
                callback: highlightLoaded
            }
        ]
    });

    new Remotes("anupbishnoi-nagarro-cssRevisited")
        .on("swipe-left", Reveal.right)
        .on("swipe-right", Reveal.left)
        .on("swipe-up", Reveal.down)
        .on("swipe-down", Reveal.up)
        .on("tap", function () { changeFace(); })
        .on("hold", Reveal.toggleOverview);

    // FUNCTIONS FOR INDIVIDUAL SLIDES
    function rotateHut() {
        var slideKey = currentSlideKey(),
            iframe = twoFaceContainer[slideKey].find(iframeSelector)[0],
            hut = iframe && iframe.contentWindow.document.querySelector(".center-area.hut");

        if (hut && hut.style) {
            var prevTransform = hut.style.WebkitTransform,
                prevDegreesMatch = prevTransform && prevTransform.match(/rotateY\((\-?\d+)deg\)/),
                prevDegrees = prevDegreesMatch && +prevDegreesMatch[1];
            prevDegrees = prevDegrees || 0;
            hut.style.WebkitTransform = "rotateY(" + (prevDegrees - 721) + "deg)";
        } else {
            logger.error("There is no hut!");
        }
    }
    window.rotateHut = rotateHut;
}());
