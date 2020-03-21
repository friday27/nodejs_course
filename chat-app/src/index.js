const path = require('path');
const http = require('http'); // Import http module
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMsg, generateLocationMsg} = require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server); //socketio is expected to be called with the raw HTTP server

const port = process.env.PORT;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

/*
    * on() allows the server to listen for an event ('connection' for this example) and respond to it.
    * Events allow you to transfer data from the client to the server or from the server to the client.
    * Event 'connection' will be triggered every time when a new connection is established.
    * The parameter socket is an object contains the information about the connection.
    * There are two sides to every event, the sender and the receiver. If the server is the sender, then the client is the receiver. If the client is the sender, then the server is the receiver. Events can be sent from the sender using emit. Events can be received by the receiver using on. (emit -> on)

    server (emit) -> client (receive) - countUpdated
    client (emit) -> server (receive) - increment
*/

io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    // socket.emit('message', generateMsg('Welcome!'));
    // socket.broadcast.emit('message', generateMsg('A new user has joined!'));

    socket.on('join', (options, callback) => {
        // ...options -> split operator
        const {error, user} = addUser({id: socket.id, ...options});

        if (error) {
            return callback(error);
        }

        socket.join(user.room); // use user.room as it's been trimed and lowercased already

        // io.to.emit: emit to everyone in a specific room
        // socket.broadcast.to.emit: like above but not emit to the current user
        socket.emit('message', generateMsg('Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMsg(`${user.username} has joined!`));
        
        callback(); // no argument = no error
    });

    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter();

        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed!');
        }

        io.to('room1').emit('message', generateMsg(msg));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.to('room1').emit('locationMessage', generateLocationMsg(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            // Not using socket.emit() as the connection is already closed.
            io.to(user.room).emit('message', generateMsg(`${user.username} has left ~`));
        }
    });
});

// User server instead of app
server.listen(port, () => {
    console.log(`Server is up! Listening on port ${port}`);
});