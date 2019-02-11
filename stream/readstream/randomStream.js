const stream =require('stream');
const Chance = require('chance');
const chance = new Chance();
class RandomStream extends stream.Readable{
    constructor(options){
        super(options)
    }
    _read(size){
        // size为每次push数据进缓存的数据大小
        const chunkdata = chance.string();// 随机字符，实际上是数据源比如文件
        process.stdout.write(`随机字符串的大小是${chunkdata.length}`);
        this.push(chunkdata,'utf-8');//以utf-8的编码格式将字符串推入缓存
        if(chance.bool({likelihood:5})){//百分之5的概率push(null),表示stream终止
            this.push(null);
        }
    }
} 

module.exports = RandomStream;
