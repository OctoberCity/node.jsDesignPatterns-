const asyncModule = module.exports;
asyncModule.initstatus = false;
asyncModule.initMethod = cb => {
    setTimeout(() => {
         this.initstatus = true;
    }, 10000);
}
asyncModule.tellmesome = cb => {
    process.nextTick(() => {
        if (!asyncModule.initstatus) {
            return cb(new Error('init can not finish'));
        }
        cb(null, `currentTime ${new Date()}`);
    });
}