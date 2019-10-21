const https = require('https');
const crypto = require('crypto');
const fs = require('fs');


const start_time = new Date();

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

function calculateHash() {


  crypto.pbkdf2('my_password',
    'salt',
    1000000,
    512,
    'sha512',
    () => {
      console.log('Kodowanie 1:', new Date() - start_time);
    }
  );
}

// #######################################################

goGoogle();

fs.readFile('./package.json', 'utf8', function(){
    console.log('Wczytanie pliku :', new Date() - start_time);
});

/**
calculateHash();
calculateHash();
calculateHash();
calculateHash();
*/


