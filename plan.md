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
