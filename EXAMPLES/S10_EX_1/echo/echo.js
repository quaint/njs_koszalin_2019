var net = require('net');
net.createServer(function (socket) {
  
  console.log('Nawiązano połączenie z gniazdem!');
  
  // Zdarzenie data może wystąpić wielokrotnie.
  socket.on('data', function (data) { 
    console.log('Zdarzenie "data"', data);
    console.log('Zdarzenie "data"', data.toString());
  });
  
  // Zdarzenie end może wystąpić tylko raz dla gniazda.
  socket.on('end', function () {
    console.log('Zdarzenie "end"'); 
  });

  // Zdarzenie close również może wystąpić tylko raz dla gniazda.
  socket.on('close', function () { 
    console.log('Zdarzenie "close"');
  });
  
  // Zdefiniowanie obsługi błędów, aby uniknąć niezgłoszonych wyjątków.
  socket.on('error', function (e) { 
    console.log('Zdarzenie "error"', e);
  });
  socket.pipe(socket);
}).listen(1337);


// nc  -v localhost 1337
