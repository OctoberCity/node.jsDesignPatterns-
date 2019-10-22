const routes = require('./routes');
const asyncWapper = require('./asyncWapper');
const http = require('http');
asyncWapper.initmethod(() => {
    console.log('async module init  finish');
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