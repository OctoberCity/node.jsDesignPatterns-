process.on('message', (message, server) => {
    if (message === 'server') {
        server.on('connection', (socket) => {
            socket.end('孩子处理请求' + process.pid);
        });
    } else {
        console.log(`启动了${process.pid+message}`);
    }
});