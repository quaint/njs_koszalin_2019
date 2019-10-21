const crypto = require('crypto');

const start = new Date();

// 1
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 1:', new Date() - start);
  }
);

// 2
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 2:', new Date() - start);
  }
);

// 3
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 3:', new Date() - start);
  }
);

// 4
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 4:', new Date() - start);
  }
);

// 5 
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 5:', new Date() - start);
  }
);

// 6 
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 6:', new Date() - start);
  }
);

// 7 
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 7:', new Date() - start);
  }
);

// 8 
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 8:', new Date() - start);
  }
);

 
 
 // 9 
crypto.pbkdf2('my_password', 
  'salt', 
  1000000, 
  512, 
  'sha512', 
  () => {
console.log('Kodowanie 9:', new Date() - start);
  }
);

