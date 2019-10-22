const fork = require('child_process').fork;
class ProcessPool {
    constructor(file, poolMax) {
        this.file = file;
        this.poolMaxNum = poolMax;
        this.pool = [];//可使用的进程
        this.active = [];//正在使用的进程
        this.waiting = [];

    }
    acquire(callback) {
        let worker;
        // 使用一个进程
        if (this.pool.length > 0) {
            worker = this.pool.pop();
            this.active.push(worker);
            return process.nextTick(callback.bind(null, null, worker));
        }
        //如果满了，把当前回调上设置进等待队列
        if (this.active.length === this.poolMaxNum) {
            return this.waiting(callback);
        }
        //如果正常还需要进程就fork一个
        worker = fork(this.file);
        this.active.push(work);
        return process.nextTick(callback.bind(null, null, worker));
    }
    // 释放进程
    release(worker) {
        if (this.waiting.length > 0) {
            const waitingCB = this.waiting.shift();
            waitingCB(null, worker);
        }
        this.active = this.active.filter(work => worker !== work);
        this.pool.push(worker);
    }
}
module.exports = ProcessPool;