# Chat App

## The WebSocket Protocal

* WebSockets allow for full-duplex (bidirectional) communication
* WebSocket is a seperate protocal from HTTP
* Persistent connection between client and server

## [Socket.io](https://socket.io/docs/)

Socket.io comes with everything needed to set up a WebSocket server using Node.

Install socket.io

    npm i socket.io

Add 2 lines in the body of index.html

    <script src="/socket.io/socket.io.js"></script>
    <script src="/js/chat.js"></script>

* Socket.io automatically serves up /socket.io/socket.io.js which contains the client-side code.
* The script tags load in the client-side library followed by a custom JavaScript file.

Create [public/js/chat.js](../chat-app/public/js/chat.js)

    io();

Refactor [src/index.js](../chat-app/src/index.js) to support Socket.io
