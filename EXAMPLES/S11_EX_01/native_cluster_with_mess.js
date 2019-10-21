var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var workers = {};
var requests = 0;
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    workers[i] = cluster.fork();
    (function (i) {
      
      // Nasłuchiwanie informacji z procesu roboczego.
      workers[i].on('message', function(message) { 
        if (message.cmd == 'incrementRequestTotal') {
      
          // Zwiększenie liczby wszystkich żądań.
          requests++; 
      
         for (var j = 0; j < numCPUs; j++) {
            // Wysłanie wszystkim procesom roboczym informacji o całkowitej liczbie żądań.
         
            workers[j].send({ 
              cmd:  'updateOfRequestTotal',
              requests: requests
            });
          }
        }
      });
})(i); 
   // Użycie domknięcia w celu zachowania wartości procesu roboczego.
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('Proces roboczy ' + worker.process.pid + ' zakończył działanie.');
  });
} else {

  // Nasłuchiwanie informacji z procesu głównego.
  process.on('message', function(message) { 
    if (message.cmd == 'updateOfRequestTotal') {
      // Uaktualnienie licznika żądań za pomocą komunikatu procesu głównego.
      requests = message.requests; 
    }
  });

  http.Server(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end('Proces roboczy w procesie ' + process.pid
      + ' twierdzi, że klaster udzielił odpowiedzi na ' + requests
      + ' żądań.');
     
    // Poinformowanie procesu głównego o konieczności zwiększenia licznika żądań.
    if (req.url !== '/favicon.ico') process.send({cmd: 'incrementRequestTotal'}); 

  }).listen(8000);
}

