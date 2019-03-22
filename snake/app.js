const fs =require("fs");
const stream = require("stream");
const path =require("path");
const EventEmit  =require("event");

// 获取命令行参数
const runMap = process.argv.slice(2);
console.log(`地图map:长:${runMap[0]},宽：${runMap[1]}`);
const allContent="这是一个流做的贪吃蛇，由自己构建双工流，限制流的移动速度构建而成";
const snakeindex = 0;
makeMap(runMap[0],runMap[1]);

 
randomMakeFile();





function makeMap(length,wdith){
	const mapArray =[];
	for(let i = 0 ; i<length ;i++){
		let x='/';
        for(let j = 0 ; j<wdith ;j++){
           x=x+i+j+'/' 
	    } 
	    mapArray.push(__dirname+x);   
	} 
    mapArray.forEach((item,key)=>{ 
    	mkdirsSync(item);
    }); 
}

// 构造文件路径,根据文件的路径
function makeFile(randomlength,randomwdith){
  let x='/';
  for(let i = 0 ; i<randomlength ;i++){
    for(let j = 0 ; j<randomwdith ;j++){
       x=x+i+j+'/' 
    }  
  }
  return x; 
}

// 根据文件同步生成文件
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}


// 随机生成文件,文件内容随数组而变，但是生成的文件的位置确定
function randomMakeFile(){
	const randomlength = Math.floor(Math.random()*runMap[0]);	
	const randomwidth = Math.floor(Math.random()*runMap[1]);
	const write = fs.createWriteStream(makeFile(randomlength,randomwidth)+'text.txt');
	const random = Buffer.from(allContent[snakeindex]);
	random.pipe(write);
} 





// 可写流创建文件用将文字写入流
class myselfWrite extends stream.Writable{
	constructor(){
		super({objectMode:true});
	}
	_write(chunk,encoding,callback){
		fs.writeFile(chunk.path,chunk.content.callback);
	}
}


//  可读流从，将字写入缓存
class  myselfRead extends stream.Readable{
	constructor(option){
		super(option);
	}
	_read(size){
         this.push("hjw");
	}



}


















