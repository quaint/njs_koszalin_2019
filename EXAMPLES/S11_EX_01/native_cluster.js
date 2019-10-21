var cluster = require('cluster');
var http = require('http');

// Ustalenie liczby rdzeni w procesorze serwera.
var numCPUs = require('os').cpus().length;   

if (cluster.isMaster) {

  for (var i = 0; i < numCPUs; i++) { 
    // Utworzenie procesu roboczego dla każdego z nich.
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('Proces roboczy ' + worker.process.pid + ' zakończył działanie.');
  });

} else {

  http.Server(function(req, res) { 
    // Zdefiniowanie zadania wykonywanego przez poszczególne procesy robocze.
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end('Jestem procesem roboczym działającym w procesie ' + process.pid);
  }).listen(8000);

}
