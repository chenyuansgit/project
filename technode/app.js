var express = require('express');
var app = express();
var path = require('path');

var port = process.env.port || 3000;

// 定义静态文件路径
app.use(express.static(path.join(__dirname, '/static')));

// 定义路由
app.use(function(req, res){
    console.log('接收到路由请求');
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

// 服务器监听端口
var server = app.listen(port, function(){
    console.log('server is listen on port:', port);
});

// 创建io服务器
var io = require('socket.io').listen(server);

// 消息列表
var messages = [];

// 监听io连接事件
io.on('connection', function(socket){
    console.log('new connection');
    //socket.emit('connected');
    // 获取所有消息
    socket.on('getAllMessage', function(){
        socket.emit('allMessage', messages);
    });
    // 添加消息到列表
    socket.on('createMessage', function(message){
        messages.push(message);
        console.log('add:',message);
        io.sockets.emit('messageAdded', message);
    });

});