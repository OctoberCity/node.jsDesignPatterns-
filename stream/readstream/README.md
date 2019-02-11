#### 实现一个可读流
- 在可读流中读取数据有两种模式

 非流动模式：添加一个对于readable事件的监听器，通过read()方法同步读取缓存中的数据，并返回一个Buffer(二进制模式下)或者string.这里有版本兼容的情况，在Node.js 0.10中，Readable为了与旧的Node.js程序向后兼容，Readable当'data'添加事件处理程序或stream.resume()调用方法时 ，流切换到'流动模式'，//官网的话我觉得是抛弃了非流动模式。
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