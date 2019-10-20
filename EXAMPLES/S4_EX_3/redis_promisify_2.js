const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis);

const client = redis.createClient();

// host: '127.0.0.1',
// port: 6379,
// db: 0


client
  .on('connect', function () {
    console.log('connected')
  })


client.setAsync("demo", "szkolenie").then((txt) => {
  console.log(txt);
  return txt;
}).then((data) => {
    console.log('SET Step 2', data);
    my_get('demo');
});


async function my_get (id) {
  var result = await client.getAsync(id);
  console.log('find key:', id, 'value: ', result);
  return Promise.resolve(result)
}

