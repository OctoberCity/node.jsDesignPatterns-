#### 交换流
交换流，一种特殊的双向流，实现一个双向流，需要实现_read(),_write()方法。但是交换流则需要提供transform(),flush()
> write ===>(_transform) ===>read
其中_transform 是对流中数据进行处理的过程

例如实现一个处理字符替换的交换流,匹配字符
```
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
```
其中flush方法会在流结束之前调用,确保数据被执行
> 还有一种特殊交换流，PassThrough,其不是抽象类，可以直接实例化，他将数据块原样输出。
