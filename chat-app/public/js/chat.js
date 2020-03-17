const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

document.querySelector('#msg-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refreshing
    const msg = e.target.elements.msg.value;
    socket.emit('sendMessage', msg);
});