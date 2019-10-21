const redis = require('redis');
const db = redis.createClient();


// const client = redis.createClient({
//     host: '127.0.0.1',
//     port: 6379,
//     db: 0
//   })

db.select(3);  // 0 default

db.set('demo', 'jakis tekst', redis.print);
db.get('demo', redis.print);

db.set('obiekt', JSON.stringify({a: 100, b: 'test', c: [1,2,3]}), redis.print);

db.get('obiekt', console.log);

db.get('obiekt', (err, result) => {
    console.log('err: ', err);
    console.log('result: ', result);
});


// expire
db.set('kill_key', 'value!', 'EX', 1, redis.print);  // 1 sec

db.get('kill_key', (err, result) => {
    console.log('err: ', err);
    console.log('result: ', result);
});

setTimeout(() => {
    db.get('kill_key', (err, result) => {
        console.log('After 2 s - err: ', err);
        console.log('After 2 s - result: ', result);
    });
    db.quit();
}, 2000);





// docker run -p 6379:6379 --rm -it redis
// node redis.js



