#### 实现一个可读流
- 可写流通过write()方法，将数据写入流中,一个请求的request,response也是流，其中response也是一个流,我们使用write方法将数据写入response中
```
const http = require("http");
const Chance = require('chance');
const chance = new Chance();
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    //百分之95的概率写入成功。
    while(chance.bool({likelihood:95})){
        res.write(chance.string());
    }
    res.on('finish',()=>{
        console.log("数据已经全部传输完毕");
    });
})
.listen('8089',()=>{console.log('服务监听服务于http://127.0.0.1:8089端口');});
```


- 背压
stream 传输数据有写入速度和传出速度，当写入速度大于传出速度，缓存中的数据无法被及时处理，那么highWaterMark就会达到，就像向一个池子（缓存区域：16kb）不断加水，并且不断出水，加水速度>出水，那么池子会溢出来，这个时候write()方法会返回false,停止传输了，等缓存被清空，会触发drain事件，可以重新执行写操作。这样的保护机制，被称为“背压”，在可写流也同样适用该机制，只不过是push()方法返回fasle.
将上面的方法进行修改，直接写入16kb的数据来测试背压效果
```
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    //百分之95的概率写入成功。
    function generateChunk(){
    while(chance.bool({likelihood:95})){
     let bpReesult= res.write(chance.string({length:16*1024}));
     if(!bpReesult){
         //如果返回false
         console.log()
         return res.once('drain',generateChunk); 
     }
    }
    generateChunk();
  }

```

- 如何实现一个可写流，继承stream.Writable,将字符串内容写进文档中
```
const mkdirp =require("mkdir");
const path =require("path");
const fs =require('fs');
const stream = require('stream');

class generatewrite extends stream.Writable {
 constructor(){
     super({objectMode:true});//使用对象模式而不是使用二进制模式
 }
 _write(chunk,encoding,callback){

     mkdirp(path.dirname(chunk.path),err=>{
         if(err){
            return  callback(err);
         };
         fs.writeFile(chunk.path,chunk.content,callback);
     });

 }
}
```

