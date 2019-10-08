const http = require("http");
const server = http.createServer((req,res)=>{
    console.log("===========");
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('孩子处理请求' + process.pid);

});
// server.on('connection',(socket)=>{
//     socket.end('孩子处理请求' + process.pid);
// });

process.on('message', (message, tcp) => {
    if (message === 'server') {
        tcp.on('connection', (socket) => {
               server.emit('connection',socket);
        });
    } else {
        console.log(`启动了${process.pid+message}`);
    }
});