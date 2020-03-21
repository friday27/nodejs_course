const socket = io();

// Elements
const $messageForm = document.querySelector('#msg-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const urlTemplate = document.querySelector('#url-template').innerHTML;

// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        createdAt: moment(message.createdAt).format('hh:mm a'),
        message: message.text
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (url) => {
    console.log(url);
    const html = Mustache.render(urlTemplate, {
        createdAt: moment(url.createdAt).format('hh:mm a'),
        url: url.url
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refreshing

    // disable the submit button
    $messageFormButton.setAttribute('disabled', 'disabled');

    const msg = e.target.elements.msg.value;

    socket.emit('sendMessage', msg, (msg) => {
        // re-enable the submit button
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        console.log('The message was delivered!', msg);
    });
});

$locationButton.addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    $locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            // Acknowledgement
            $locationButton.removeAttribute('disabled');
            // console.log('Location shared!');
        });
    });
});

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error);
        location.href = '/'; 
    }
});