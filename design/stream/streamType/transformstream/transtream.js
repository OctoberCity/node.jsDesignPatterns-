const stream = require('stream');
class transtream extends stream.Transform {
    constructor(serarch, replace) {
        super();
        this.serarch = serarch;
        this.replace = replace;
        this.tailword = ''; //这是每个数据块后面的一部分，因为传输以数据块的形式，可能命中的字符数据是分开的
    }
    _transform(chunk, encoding, callback) {
        const block = (this.tailword + chunk).split(this.serarch); //拼凑前奏进行匹配
        const lastblock = block[block.length - 1];
        const tailLen = this.serarch.length - 1;
        this.tailword = lastblock.slice(-tailLen); //将后面部分拼接部分替换
        block[block.length - 1] = lastblock.slice(0, -tailLen);

        this.push(block.join(this.replace)); //重新拼接
        callback();

    }
    _flush(callback) {  //因为最后一部分数据是不会添加进去的所以在flush方法中执行
        this.push(this.tailword);
        callback();
    } 
}
module.exports = transtream;