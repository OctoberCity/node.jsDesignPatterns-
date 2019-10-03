const fs = require('fs');
const {compressAndEncrypt,decryptAndDecompress} = require('./combinestream');
const stream = require('multipipe');// 生成组合流

// 加密一段密码文件并且压缩至一个文件中
// fs.createReadStream(process.argv[3])
// .pipe(compressAndEncrypt(process.argv[2]))
// .pipe(fs.createWriteStream(`${process.argv[3]}.zip`))
// .on('error',()=>{
//     console.log("这是最后一个流的错误");
// });


// 解密

stream(fs.createReadStream(process.argv[3])
.pipe(decryptAndDecompress(process.argv[2]))
.pipe(fs.createWriteStream(`${process.argv[3].slice(0,-4)}`))
 ).on('error',(error)=>{
      console.log("所有流的错误都能处理了");
});