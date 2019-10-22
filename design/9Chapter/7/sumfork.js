const eventEmitter = require('events').EventEmitter;
const processPool = require('./processPool');
const works = new processPool('./app.js', 2);
class SumFork extends eventEmitter {
    constructor() {
        super();
        this.sum = sum;
        this.set = set;
    }
    strart() {
        works.acquire((error, worker) => {
            worker.send({ sum: this.sum, set: this.set });
            const onMessage = msg => {
                if (msg.event === 'end') {
                    worker.removeListener('message', onMessage);
                    works.release(worker);
                }
                this.emit(msg.event, msg.data);
            }
            worker.on('message', onMessage);
        });
    }

}
module.exports = SumFork;
