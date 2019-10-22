const asyncModule = module.exports;
asyncModule.initstatus = false;
asyncModule.initMethod = cb => {
    setTimeout(() => {
        console.log("10秒之后异步模块准备完毕");
        this.initstatus = true;
    }, 10000);
}
asyncModule.tellmesome = cb => {
    process.nextTick(() => {
        if (!asyncModule.initstatus) {
            return cb(new Error('初始化未完成'));
        }
        cb(null, `currentTime ${new Date()}`);
    });
}