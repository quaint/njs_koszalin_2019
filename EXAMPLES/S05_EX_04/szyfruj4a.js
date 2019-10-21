process.env.UV_THREADPOOL_SIZE=3;

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

 
