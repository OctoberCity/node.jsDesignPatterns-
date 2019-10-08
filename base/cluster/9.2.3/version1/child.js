process.on('message',(message,server)=>{
    if(message === 'server'){
        server.on('connection',(socket)=>{
            socket.end('孩子处理请求');
        });
    }
});