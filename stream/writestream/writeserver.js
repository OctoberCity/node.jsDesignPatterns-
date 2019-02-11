const http = require("http");
const Chance = require('chance');
const chance = new Chance();
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    //百分之95的概率写入成功。
    function generateChunk(){ 
    while(chance.bool({likelihood:95})){ 
     let bpReesult= res.write(chance.string({length:16*1024}));
     if(!bpReesult){
         //如果返回false 
         return res.once('drain',generateChunk); 
     }
    }
  }
  generateChunk();
    res.on('finish',()=>{
        console.log("数据已经全部传输完毕");
    });
})
.listen('8089',()=>{console.log('服务监听服务于http://127.0.0.1:8089端口');});