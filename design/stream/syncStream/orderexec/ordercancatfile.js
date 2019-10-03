const form =require("from2-array");
const through = require("through2");
const fs = require("fs");
function orderconcatfile(resultfile,files,cb){
    const  refilestream= fs.createWriteStream(resultfile);
    form.obj(files).pipe(through.obj((file,encoding,done)=>{
        const src =fs.createReadStream(file);
        src.pipe(refilestream,{end:false});//将此次文件内容传入最终目录的可写流中。
        src.on('end',done);
    }))
    .on('finish',()=>{
        refilestream.end();//完结撒花
        cb();
    });

}
module.exports=orderconcatfile;