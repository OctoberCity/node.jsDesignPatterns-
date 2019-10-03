#### 顺序执行

- 使用构建工具构建流

对于如何构建可读可写流以及交换流，虽然代码很少，但是我们没必要每次去构造，node.js社区已经有了足够简便和快捷的解决方案，在非常多的流构建处理工具中，拿两个作为举例子，一个是through2以及from2-array.

其中through2是主要构建转换流，对于转换方式，他将其作为参数传递，对应_transform,_flush，且支持多种数据格式，十分方便

而form2-array，将数据变为可读流数组
支持的格式也十分的多。
```
// 取自官网的例子
var from = require('from2-array')
var through = require('through2')
 
from.obj([{
  name:'a'
},{
  name:'b'
},{
  name:'c'
}]).pipe(through.obj(function(chunk, enc, cb){
    console.log('found: ' + chunk.name)
    cb()
}))
```
- 顺序执行文件内容合并操作
> 无论是交换流还是pipe都是当数据块或数据完成之后，才会对下一个数据进行操作，流的默认执行顺序执行处理数据。
虽然此次操作可以用async/await，promise或者回调的操作,去解决，但是这也不失为一种解决办法，并且代码量上回更少，让人注重去实现_transform(),而不是调度解决顺序问题。
```
const form =require("from2-array");
const through = require("through2");
const fs = require("fs");
function orderconcatfile(resultfile,files,cb){
    const  refilestream= fs.createWriteStream(refilestream);
    form.obj(files).pipe(through.obj((file,encoding,done)=>{
        const src =fs.createReadStream(file);
        src.pipe(refilestream,{end:false});//将此次文件内容传入最终目录的可写流中。
        src.on('end',done);
    }))
    .on('finish',()=>{//当数组中文件都操作完毕
        resultfile.end();//完结撒花
        cb();
    });

}
module.exports=orderconcatfile;
```
执行命令node useorderconcatfile.js t.txt text1.txt text2.txt 


