var fs = require('fs');
 
var contents = fs.readFileSync('./big_sample.txt', 'utf8');
console.log(contents);
