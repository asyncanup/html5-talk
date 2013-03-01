(function () {

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
        mouseWheel: false,
        rollingLinks: false,

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

    //new Remotes("preview")
        //.on("swipe-left", function (e) {
            //Reveal.right();
        //})
        //.on("swipe-right", function (e) {
            //Reveal.left();
        //})
        //.on("swipe-up", function (e) {
            //Reveal.down();
        //})
        //.on("swipe-down", function (e) {
            //Reveal.up();
        //})
        //.on("tap", runCodeAndShowLog);


}());
