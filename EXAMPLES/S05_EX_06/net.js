const https = require('https');

const start_time = new Date();

// get
https.request('https://google.com', function(res){

    res.on('data', function() {});

    res.on('end', function() {
	console.log('https - google.com ', new Date() - start_time);
    });

    res.on('error', function(err) {
       console.log('Error ', err);
    });

}).end();

