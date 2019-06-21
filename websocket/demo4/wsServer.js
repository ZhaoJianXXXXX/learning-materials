//var app = require('http').createServer(handler)
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

var PORT = 3000;

var clientCount = 0;

app.listen(PORT);

/*socket.emit 给该socket的客户端发送消息*/
/*io.emit 给所有客户端广播消息*/

io.on('connection', function(socket){
	clientCount++;
	let nickname = 'user_' + clientCount;
	socket.emit('hello', nickname);
	io.emit('enter', { content : 'is comming' , nickname });
	//监听客户端
	socket.on('message', function(str){
		io.emit('message', { nickname , content : str });
	});
	//监听客户端
	socket.on('disconnect', function(){
		//有人退出房间则通知所有人该人已退出
		io.emit('leave', { nickname , content : ' is left' });
	})
})



//io.on('connection', function (socket) {
//	socket.emit('news', { hello: 'world' });
//	socket.on('my other event', function (data) {
//		console.log('my other event', data);
//	});
//});

console.info('websocket server listen on port : ' + PORT);
