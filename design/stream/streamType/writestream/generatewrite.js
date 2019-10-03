const mkdirp =require("mkdirp");
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
module.exports=generatewrite;