const redis = require('redis-promisify');
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
  db: 0
});


client.setAsync("string key", "string val").then((txt) => {
  console.log(txt);
  return txt;
}).then((data) => {
    console.log('SET Step 2', data);
});

client.setAsync("pi", 3.14).then((txt) => {
    console.log(txt);
    return txt;
  }).then((data) => {
      console.log('SET Step 2', data);
  });

client.multi().get('string key').get('pi').get('not_ex').execAsync().then((replies) => {
  console.log('GET ', replies);
  return replies;
}).then((data) => {
    console.log('GET Step 2', data);
});

setTimeout(() => { 
    console.log('Close connection after 5s ....')
    client.quit(); 
}, 
5000);