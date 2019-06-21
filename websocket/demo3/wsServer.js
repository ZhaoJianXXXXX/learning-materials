var ws = require('nodejs-websocket');

var PORT = 3000;

var clientCount = 0;

var server = ws.createServer(function(conn){
	clientCount++;
	let nickname = 'user_' + clientCount;
	broadcast({ type : 'alert' , content : 'is comming' , nickname });
	broadcast({ type : 'hello' , content : 'welcome' , nickname });
	conn.on('text', function(str){
		broadcast({ type : 'text' , nickname , content : str });
	})
	conn.on('close', function(code, reason){
		broadcast({ type : 'alert' , content : 'is left' , nickname });
	})
	conn.on('error', function(err){
		console.info(err)
	})
}).listen(PORT)

console.info('websocket server listen on port : ' + PORT);

//开启多个浏览器页面 即为开启了多少个socket连接
function broadcast(data){
	server.connections.forEach((conn) => {
		conn.sendText(JSON.stringify(data))
	})
}
