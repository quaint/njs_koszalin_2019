var redis = require('redis');

var Promise = require('bluebird');

Promise.promisifyAll(redis);
var client  = redis.createClient();


client
.setAsync('test', 'ala ma kota')
.then((r)=>{
  console.log(r);
})

client
.getAsync('test')
.then((a) => {

console.log(a);
})



client
.setAsync('test2', 'kot ma ale')
.then((r)=>{

  return client.getAsync('test2');
})
.then((a) => {
console.log(a);
})
