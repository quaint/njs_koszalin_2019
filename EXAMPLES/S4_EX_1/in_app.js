const express = require('express');
const path = require('path');
const app = express();
const mcache = require('memory-cache');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


const cache = (time) => {

    return (req, res, next) => {
        const key = '__app__' + req.originalUrl || req.url;
        const body_cached = mcache.get(key);

        if (body_cached) {
 
            res.send(body_cached);
            res.end();

        } else {
            res.origSend = res.send;

            res.send = (body) => {
                mcache.put(key, body, time * 1000);
                res.origSend(body);
            }

            next();


        }
    };
}

app.get('/demo', cache(20), (req, res) => {
    res.render('demo', {title: 'demo', message: 'Welcome', date: new Date()});
});

app.listen(3000);
