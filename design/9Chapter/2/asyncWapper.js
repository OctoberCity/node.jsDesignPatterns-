const asyncModule = require('./asyncModule');
const asyncWapper = module.exports;
let pending = [];
const notInitState = {
    initmethod: (cb) => {
        asyncWapper.initmethod(() => {
            asyncWapper.initstatus = true;
            activeState = initializedState;
            pending.map((req) => {
                asyncModule[req.method].apply(null, req.args);
            });
            pending = [];
            cb();
        });
    },
    tellmesome: (cb) => { 
        return pending.push({
            method: 'tellmesome',
            args: arguments
        });
    }
}
let initializedState = asyncModule;
let activeState = notInitState;



asyncWapper.initstatus = false;
asyncWapper.initmethod = () => {
    activeState.initmethod.apply(activeState, arguments);
};
asyncWapper.tellmesome = () => {
    activeState.tellmesome.apply(activeState, arguments);
}
