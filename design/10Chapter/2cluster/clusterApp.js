const cluster = require('cluster');
const os = require('os');
if (cluster.isMaster) {
    const cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    //保证进程可用
    cluster.on('exit', (work, code, signal) => {
        if (code !== 0) {  //非正常退出 非自杀
            cluster.fork();
        }
    })
    // 零停机重启,监听外部信号
    process.on('SIGUSR2', () => {
        const works = Object.keys(cluster.workers);
        function resatrtWork(i) {
            if (i > works.length) return;//循环结束
             const work = cluster.workers[works[i]];
             console.log(`i will restart porcess ${works.pid}`);
             work.disconnect(); //关闭连接之后会发送
             work.on('exit',(code,signal)=>{
                 const newfork = cluster.fork();
                 newfork.on('listening',()=>{
                     //确定连接之后开启下一个重启
                     resatrtWork(i+1);
                 });
             });
        };
        resatrtWork(0);


    });

} else {
    require('./app');
}
