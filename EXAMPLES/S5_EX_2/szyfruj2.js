const crypto = require('crypto');

const start = new Date();

crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 1:', new Date() - start);
  }
);


crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 2:', new Date() - start);
  }
);


 
