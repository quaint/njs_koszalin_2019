var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./key.pem'),  // Klucz SSL i certyfikat zostały podane jako opcje.
  cert: fs.readFileSync('./key-cert.pem')
};
https.createServer(options, function (req, res) { // Obiekt opcji jest przekazywany jako pierwszy.
  res.writeHead(200);  // Moduły https i http mają niemalże identyczne API.
  res.end("Hello\n");
}).listen(3000);

// https://localhost:3000/
