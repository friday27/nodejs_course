const socket = io();

// Elements
const $messageForm = document.querySelector('#msg-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');

socket.on('message', (message) => {
    console.log(message);
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
            $locationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
});

