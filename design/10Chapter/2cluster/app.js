const http = require('http');
const server = http.createServer((req, res) => { 
    for (let i = 0; i < 10000000; i++) { }
    console.log(`process pid:${process.pid} `);
    res.writeHead(200);
    res.end('helloworld');
});
server.listen(8080, (err) => {
    console.log('process listen port 8080');
});

//随机生成error
setTimeout(()=>{
    throw new Error('a random error')
},Math.ceil(Math.random()*10)*1000)
// module.exports = server;