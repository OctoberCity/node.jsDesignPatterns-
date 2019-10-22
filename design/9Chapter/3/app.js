const http = require("http");
const url = require('url');
const totalSales = require('./totalSales');
const server = http.createServer((req, res) => {
    const query = url.parse(req.url,true).query;
    totalSales(query, (err, sum) => {
        res.writeHead(200);
        res.end('totalSales is ' + sum);
    })

});
server.listen(8080, () => {
    console.log('8080 port  be listend');
});