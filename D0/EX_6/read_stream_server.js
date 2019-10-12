const fs = require('fs');
const server = require('http').createServer();


server.on('request',(req,res) => {
	fs.createReadStream('./big_sample.txt').pipe(res);
})

server.listen(4000,(err) => {
if(!err)
	console.log("listening on 4000");
});

