var http = require('http');
var os = require('os');

http.createServer(function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Hello on host ${ os.hostname( )}</h1>`);
    res.write('<h2>' + new Date() + '<h2>');
    res.end();
}).listen(8080);


