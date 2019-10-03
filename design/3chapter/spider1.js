const path =require("path");
const request =require("request");
const mkdirp  = require("mkdirp");
const fs = require("fs");

const utils =require("utils");


function spider(url,callback){
	const filename = urlToFilename(url);
	fs.exists(filename,exists=>{
		if(!exists){
			console.log(`不存在，下载${url}`);
			request(url,(error,response,body)=>{
				if(error){
					callback(error);
				}else{
					mkdirp(path.dirname(filename),error=>{
						if(error){
							callback(error);
						}else{
							fs.writeFile(filename,body,(error)=>{
								if(error){
									callback(error);
								}
								else{
									callback(null,filename,true);//
								}
							});
						}
					});
				}
			});
		}else{
			callback(null,filename,true);
		}
	});
}

function urlToFilename(){
	return null;
}


//文件执行入口
spider(process.argv[2],(error,filename,isdownload)=>{ 
	if(error){
		console.log(error);
	}

	if(isdownload){
          console.log(`这个是新下载的文件${filename}`);
	}else{
          console.log(`这个是已经下载的文件${filename}`);

	}

});

