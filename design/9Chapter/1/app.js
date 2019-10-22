const routes = require('./routes');
const asyncModule = require('./asyncModule');
const http = require('http');
asyncModule.initMethod(() => {
    console.log('异步模块初始化完成');
});
const server = http.createServer((req, res) => {
    if (req.url === '/say') {
        return routes.say(req, res);
    }
    res.writeHead('404');
    res.end('not page found');
});
server.listen(8080, (err) => {
    console.log('监听8080端口');
});