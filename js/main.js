(function () {
    /*globals Reveal:false, hljs:false */

    var FRONT = "front",
        BACK = "back";

    var twoFaceContainer   = window.twoFaceContainer   = {},
        frontFaceContainer = window.frontFaceContainer = {},
        backFaceContainer  = window.backFaceContainer  = {},
        currentFace        = window.currentFace        = {},
        currentRotation    = window.currentRotation    = {},
        demoIframeSrc      = window.demoIframeSrc      = {},
        demoSelector       = window.demoSelector       = {};

    var iframeSelector = ".inner-container." + BACK + " > iframe.content";

    window.changeFace = changeFace;
    window.changeAllFaces = changeAllFaces;

    setupHandlers();
    setupRemote();
    setupReveal();

    function setupHandlers() {
        $(document).ready(function () {
            $(".two-face .face .change-face").click(function () {
                changeFace();
            });

            $(".two-face").each(function () {
                var container = $(this),
                    slideKey = slideKeyFromBlock(container),
                    frontFace = container.find(".inner-container " + FRONT),
                    backFace = container.find(".inner-container." + BACK + " iframe");

                twoFaceContainer[slideKey] = container;
                frontFaceContainer[slideKey] = frontFace;
                backFaceContainer[slideKey] = backFace;
                currentFace[slideKey] = FRONT;
                currentRotation[slideKey] = 0;
            });

            $("body").show();
            if ($.browser.chrome || $.browser.webkit) {
                $("body > .reveal").fadeIn("slow");
            } else {
                logger.error("Please use a webkit browser (Chrome / Safari)");
            }
        });
    }

    function setupReveal() {
        Reveal.initialize({
            controls: true,
            progress: true,
            history: true,
            center: false,

            keyboard: true,
            overview: true,
            loop: false,
            rtl: false,
            autoSlide: 0,
            rollingLinks: true,

            theme: "sky",
            transition: "default"
        });
    }

    function setupRemote(yes) {
        if (yes) {
            new window.Remotes("anupbishnoi-nagarro-html5Revisited")
                .on("swipe-left", Reveal.right)
                .on("swipe-right", Reveal.left)
                .on("swipe-up", Reveal.down)
                .on("swipe-down", Reveal.up)
                .on("tap", function () { changeFace(); })
                .on("hold", Reveal.toggleOverview);
        }
    }

    // Core changeFace function that shows the other side of the current (or passed in) slide
    function changeFace(slideKey, keepSameDirectionOfRotation) {
        slideKey = slideKey || currentSlideKey();

        var oldFace = currentFace[slideKey],
            newFace = oldFace === FRONT ? BACK : FRONT,
            container = twoFaceContainer[slideKey],
            oldRotation = currentRotation[slideKey],
            newRotation = keepSameDirectionOfRotation ?
                oldRotation - 180 :
                oldFace === FRONT ?
                    oldRotation - 180 :
                    oldRotation + 180;

        currentFace[slideKey] = newFace;
        currentRotation[slideKey] = newRotation;

        container.css("-webkit-transform", rotationCssFromDegree(newRotation));

        initFace(newFace, slideKey);
        destroyFace(oldFace, slideKey);
    }

    function initFace(newFace, slideKey) {
        if (newFace === BACK) {
            slideKey = slideKey || currentSlideKey();

            var backFace = backFaceContainer[slideKey];
            if (backFace.attr("src") !== backFace.attr("data-src")) {
                backFace.attr("src", backFace.attr("data-src"));

                //backFace.hide();
                //showSpinner();
                //$(backFace).load(function () {
                    //hideSpinner();
                    //backFace.fadeIn();
                //});
            }
        }
    }

    function showSpinner() {
        $(".spinner").fadeIn("slow");
    }

    function hideSpinner() {
        $(".spinner").fadeOut("fast");
    }

    function destroyFace(oldFace, slideKey) {
        if (oldFace === BACK) {
            slideKey = slideKey || currentSlideKey();

            var backFace = backFaceContainer[slideKey];
            //console.log("destroyed backFace for", slideKey);
        }
    }

    function changeAllFaces() {
        Object.keys(twoFaceContainer).forEach(changeFace);
    }

    // Helpers
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

}());
