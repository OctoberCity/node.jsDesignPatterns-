#### 实现一个可读流
- 在可读流中读取数据有两种模式

 非流动模式：添加一个对于readable事件的监听器，通过read()方法同步读取缓存中的数据，并返回一个Buffer(二进制模式下)或者string.这里有版本兼容的情况，在Node.js 0.10中，Readable为了与旧的Node.js程序向后兼容，Readable当'data'添加事件处理程序或stream.resume()调用方法时 ，流切换到'流动模式'.
 ```
 process.stdin和stdout是标准输出输入
 process.stdin.resume()
 process.stdin.on('readable',()=>{
     let chunk ;
          process.stdout.write('新数据到了');
     while((chunk = process.stain.read())!== null){
             process.stdout.write(`数据块的长度是${chunk.length}：${chunk.toString()}`);
     }
 }).on('end',()=>{
     process.stdout.write('hjw');
 });

 ```

 流动模式：给data添加一个监听器
 ```
 process.stdin.on('data',(chunk)=>{
     process.stdout.write('新数据到了');
     process.stdout.write(`数据长度：${chunk.length}，${chunk.toString()}`); 
 }).on('end',()=>{
     process.stdout.write('结束');
 });

 ```

 - 如何实现一个可读流
 我们创建一个新类，继承stream.Readable,并且提供对_read()方法的的实现。调用_read()方法之后，会调用push(size)方法，将数据添加至缓存中, 如文件randomStream.js,接着使用流动模式，监听数据，将其读出。
 ```
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
 ```
 实现继承stream.Readable一般会有这几个参数 
 - encoding:编码格式
 - objectModel :是否开启对象模式,默认fasle
 - 内部缓存存储的大小限制（highwaterMark）,当缓存到达上限之后，stream不会再向缓存中push数据 
