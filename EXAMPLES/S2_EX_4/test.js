var a = require('./a.js');
console.log('to nasze pierwotne a', a);     // {}
a.text = 'demo';
console.log('to nasze nowe a', a);   // { text: 'demo'}

var b = require('./a.js');
console.log('to nasze pierwotne b', b);     // { text: 'demo'}
b.text = 'to nie demo';
console.log('to nasze ostatnie a', a);   // { text: 'to nie demo'}
console.log('to nasze nowe b', b);   // { text: 'to nie demo'}

