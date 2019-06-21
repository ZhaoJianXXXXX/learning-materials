var ws = require('nodejs-websocket');

var PORT = 3000;

var server = ws.createServer(function(conn){
	console.info('New connection');
	conn.on('text', function(str){
		console.info('receive-' + str);
		conn.sendText(str);
	})
	conn.on('close', function(code, reason){
		console.info('connection closed')
	})
	conn.on('error', function(err){
		console.info('handle err')
		console.info(err)
	})
}).listen(PORT)

console.info('websocket server listen on port : ' + PORT)
