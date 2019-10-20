var io = require('socket.io-client');

var client = io.connect('http://localhost:9090');

client.on('welcome', function (data) {
    console.log('Message from server: ', data);
});


