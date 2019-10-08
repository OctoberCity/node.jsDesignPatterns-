const child_process = require("child_process")
const child1 = child_process.fork('./child.js');
child1.send("baseinfo==child1");

const child2 = child_process.fork('./child.js');
child2.send("baseinfo==child2");

const server = require('net').createServer();
server.on('connection', (socket) => {
    console.log('父进程处理');
    socket.end("父进程处理");
});

server.listen(8089, (err) => {
    child1.send("server", server);
    child2.send("server", server);
    server.close();
});


//  经孩子进程处理的方式变为http层
//  此时浏览器也能访问了
