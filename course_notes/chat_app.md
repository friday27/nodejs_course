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

## Event Acknowledgements

Acknowledgement is what the receiver send back to let the source know the message is received.

server (emit) -> client (receive) --acknowledgement--> server

client (emit) -> server (receive) --acknowledgement--> server

Acknowledgement is optional. You should set it as the last parameter of emit() as a callback function, so receiver can use this callback function to let sender know the acknowledgement is received.

## Rendering Messages through Mustache

Create a JavaScript block in index.html and include mustache. You shoule use different templates for different HTML elements (e.g. plain text and link).

    <div id="messages"></div>
        
    <script id="message-template" type="text/html">
        <div>
            <p>This is a message.</p>    
        </div>
    </script>

    <script id="url-template" type="text/html">
        <div>
            <p><a href="{{url}}" target="_blank">My current location</a></p>    
        </div>
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>

In chat.js, grap the element and templates, then render and insert dynamic html.

    // Elements
    const $messages = document.querySelector('#messages');

    // Templates
    const messageTemplate = document.querySelector('#message-template').innerHTML;

    const urlTemplate = document.querySelector('#url-template').innerHTML;

    socket.on('message', (message) => {
        const html = Mustache.render(messageTemplate, {
            message
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });

    socket.on('locationMessage', (url) => {
        const html = Mustache.render(urlTemplate, {
            url
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });

## Integrating Time into App with [Moment.js](https://momentjs.com/) ([doc](https://momentjs.com/docs/))

Grap the script tag in index.html

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>

Call moment directly in your client JS files

    const time = moment(message.createdAt).format('hh:mm a');
