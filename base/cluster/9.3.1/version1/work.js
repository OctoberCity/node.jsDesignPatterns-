const http = require('http');
let socket;
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    if(Math.random()*10>5){
        throw new  Error('ssss');
    }
    res.end('处理' + process.pid);
});
process.on('message', (message, tcp) => {
    socket = tcp;
    tcp.on('connection', (socket) => {
        server.emit('connection', socket);
    });
})

process.on('uncatchException', (error) => {  
    // 关闭socker连接不在接收请求
    socket.close(() => {
        process.exit(1);//退出进程
    });
})