const RandomStream = require("./randomStream");
const randomstream = new RandomStream();

randomstream.on('data',(chunk)=>{
    console.log("来新数据了");
    console.log(`新数据的长度是：${chunk.length}`);
    console.log(`新数据的内容是：${chunk.toString()}`);
});