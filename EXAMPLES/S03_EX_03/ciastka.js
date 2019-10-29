// var connect = require('express');

var connect = require("connect");
var cookieParser = require("cookie-parser");
var app = connect()
  .use(cookieParser("nasze super tajne haslo"))
  .use(function(req, res) {
    console.log("Cookie :", req.cookies);
    console.log("Cookie signed :", req.signedCookies);
    res.end("witaj\n");
  })
  .listen(3000);

// res.cookie('name', 'demo', { signed: true });

// curl http://localhost:3000
// curl http://localhost:3000/ -H "Cookie: foo=bar; bar=baz"
// curl http://localhost:3000/ -H "Cookie: name=luna.PQLM0wNvqOQEObZXUkWbS5m6Wlg"
// curl http://localhost:3000/ -H "Cookie: name=s%3Ademo.2kKyDRT72Bcdlx8zhDgF2btAna97zfQrbx4E%2BR2Whn8"
