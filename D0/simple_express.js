var express = require('express');
var app = express();
 
app.get('/', function(req, res){ // Udzielanie odpowiedzi na wszystkie żądania do /.
  res.send('Hello'); // Wyświetlenie komunikatu "Hello" w odpowiedzi na wszystkie żądania.
});
 
app.listen(3000); // Nasłuchiwanie na porcie 3000.


// http://localhost:3000
