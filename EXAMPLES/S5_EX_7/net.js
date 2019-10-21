const https = require('https');

const start_time = new Date();

// get

function goGoogle() {

  https.request('https://google.com', function(res){

    res.on('data', function() {});

    res.on('end', function() {
	console.log('https - google.com ', new Date() - start_time);
    });

    res.on('error', function(err) {
       console.log('Error ', err);
    });

  }).end();

}

// x 10
goGoogle();
goGoogle();
goGoogle();
goGoogle();
goGoogle();
goGoogle();
goGoogle();
goGoogle();
goGoogle();
goGoogle();
