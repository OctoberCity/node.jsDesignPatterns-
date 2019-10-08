const children = require("child_process").fork('./child.js');;
const server = require('net').createServer();
server.on('connection', (socket) => {
    console.log('父进程处理');
    socket.end("父进程处理");
});

server.listen(8089, (err)=>{
 children.send("server",server);
});


// 这里实际上大概率都由子进程上处理，与书上结果相差，出现很少次数父进程处理的情况