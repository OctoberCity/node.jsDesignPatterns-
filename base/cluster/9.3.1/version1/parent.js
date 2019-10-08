const fork = require('child_process').fork;
const cpus = require('os').cpus();
const server = require('net').createServer();
server.listen(8089,(err)=>{
    console.log(`主进程${process.pid}已经启动`);
});
const works = {}; 
for (let i = 0; i < cpus.length; i++) {
    createfork();
}

function createfork() {
    const work = fork(__dirname + '/work.js');
    const pid = work.pid;
    works[pid] = pid;
    work.on('exit', (code, signal) => {
        console.log(`work_process${pid} exit`);
        delete works[pid];
        createfork()
    });
    work.send('server', server);
    console.log(`work_process${pid} becreated`);

}



// 监听主程序错误退出
process.on('exit', (code, signal) => {
    works.map((item) => {
        process.kill(item);
    });
});


// 关闭进程 taskkill /pid 14396  -t  -f