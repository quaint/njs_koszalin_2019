var io = require('socket.io');
var server = io(9090);

var counter = 0;

server.on('connection', function (socket) {
    var clientId = ++counter;
    console.log('Client ' + clientId + ' connected');
    
    socket.emit('welcome', new Date());
    
    socket.on('disconnect', function () {
        console.log('Client ' + clientId + ' disconnected');
    });
});

