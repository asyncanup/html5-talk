HTML5 Tech Talk
---------------

# Intro

HTML5 is not the name of a technology,
it is a set of 3 technologies that are
undergoing an overhaul simultaneously

HTML5 ~= HTML + JS + CSS


# Why HTML5?

It's not about what's possible in the latest browsers.
It's not about impressive new technologies.

It's about making an app.

# An app needs
View Manipulation
Interactive User Input
Rich Graphics
File / Hardware Access
State Management
Offline Capability
Realtime Communication
Accessibility
Cross-Platform Support

State Management
    History API
        pushState
        popState

View Manipulation
    DOM Access
        document.getElementsBy[Id|TagName|ClassName]
        document.querySelector[All] (Actual CSS selectors, just like jQuery)
        data- attributes (el.dataset)
        el.classList[.add|.remove|.toggle|.contains]
        el.className === el.classList.toString()
    Semantic Tags
        header
        footer
        nav
        section
        article
        aside
        time
        menu
        meter
        progress

        datalist

Interactive User Input
    Form Input
        input list
        input type
            email
            date
            range
            search
            tel
            color
            number
            x-webkit-speech
        input required
        input pattern (regular expression validation)
    Drag and Drop
        draggable
        dragstart
        dragend
        dataTransfer
            .setData
            .getData
            .files (for dragging in or out from desktop)
            .effectAllowed
        drop event
    User Media (Webcam)
        getUserMedia
    User Media (Mic Audio)

Accessibility
    ARIA (Accessible Rich Internet Applications) attributes
        role
        aria-labelledby
        aria-checked
        aria-disabled
        aria-grabbed
    Microdata (http://www.google.com/webmasters/tools/richsnippets) attributes
        itemscope
        itemtype
        itemprop

Rich Graphics
    CSS3!
        http://www.roughregister.com/public/guess-the-king
        http://www.roughregister.com/public/envelope
    JS Animations
        requestAnimationFrame
    Native Audio/Video
        http://www.htmlfivewow.com/slide64
    Canvas
        http://www.htmlfivewow.com/slide52
    WebGL (Canvas 3D)
    SVG (Inline + Importing a file)

Offline Capability
    navigator.[onLine|offLine]
    Web Storage
        localStorage.[get|set]Item (synchronous)
    Web SQL
        openDatabase
        transaction
        executeSql
    IndexedDB (key-value store)
        indexedDB.open
        onsuccess
        transaction
        objectStore
        openCursor
    Application Cache
        manifest
        .appcache
        applicationCache.status
        updateready
        applicationCache.swapCache

Realtime Communication
    WebSocket
        new WebSocket (ws://)
            .onopen
            .onmessage
            .onclose
            .send
        WebSocket Secure (wss://)
    Web Workers
        new Worker
            .onmessage
            .postMessage
    Push Notifications
        Desktop
            webkitNotifications
                .checkPermission
                .requestPermission
                .createNotification
        Mobile
            Phonegap, etc

File / Hardware Access
    File System Access
        http://www.htmlfivewow.com/demos/terminal/terminal.html
        new FileReader()
            .readAsDataURL
        requestFileSystem
            fs.root.getFile
            file.createWriter
            writer
                .write
                .onwrite
                .onerror
    navigator.geolocation
        .getCurrentPosition
    deviceorientation
        .alpha
        .beta
        .gamma

Cross-Platform Support
    all browsers
    node webkit appjs
    windows 8
    chrome app
    adobe air

Shadow DOM
Screen Sharing!
    https://html5-demos.appspot.com/static/getusermedia/screenshare.html
CSS Shaders
