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
});


//  增加接收句柄的孩子进程
// 结果虽然有时候会出现两个孩子进程处理的时候，但是基本情况是长时间一个进程进行处理