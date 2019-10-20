var cache = require('memory-cache');


// zapis
cache.put('foo', 'bar');

// odczyt
console.log(cache.get('foo'));


// zapis - rekord zyje 100 ms
cache.put('platform', 'Node.JS', 100, function(key, value) {
    console.log(key + ' is ' + value);
});
console.log('Platform will now ' + cache.get('platform'));



// po 200 ms - co z rekordem?
console.log('After 200 ms ...');
setTimeout(function() {
    console.log('Platform is ' + cache.get('platform'));
}, 200);


// ewentulanie jako osobna instancja
// create new cache instance
var newCache = new cache.Cache();
newCache.put('foo', 'newbaz');
 
setTimeout(function() {
  console.log('foo in old cache is ' + cache.get('foo'));
  console.log('foo in new cache is ' + newCache.get('foo'));
}, 200);
