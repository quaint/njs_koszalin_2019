const fs = require('fs');
const server = require('http').createServer();


server.on('request',(req,res) => {
	fs.readFile('./big_sample.txt',(err,data) => {
     if(!err) res.end(data);
     else
     console.log(err);	
	})
})

server.listen(3000,(err) => {
if(!err)
	console.log("listening on 3000");
});