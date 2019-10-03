#### 异步控制流模式之回调

- 由以下的代码开始，以下代码是一个下载网页内容到文件的代码
```
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

```
在看书的时候，对于这个函数功能还是很好理解的，但是在代码结构上并不是很好地一个样子，错误回调优先的处理,太多的ifelse，定位问题过于冗余，于是我们对此进行优化
> 1. 处理错误处理模式
> 2. 代码复用，将可以独立的，可复用的代码抽出单独成一个模块（我为了方便，我仅仅是抽成一个同文件方法）
以下是优化之后的代码spider2.js
```
function spider(url, callback) {
    const filename = urlToFilename(url);
    fs.exists(filename, exists => {
        if (exists)
            return callback(null, filename, false);
        console.log(`不存在，下载${url}`);
        download(url, filename, (error) => {
            if (error)
                return callback(error);
            callback(null, filename, true)
        });

    });
}

// 将内容生成文件
function savefile(filename, content, callback) {
    mkdirp(path.dirname(filename), error => {
        if (error)
            return callback(error);
        fs.writeFile(filename, content, callback);
    });

}

// 将网页请求生成文件
function download(url, filename, callback) {
    request(url, (error, response, body) => {
        if (error)
            return callback(error);
        savefile(filename, body, error => {
            if (error)
                return callback(error);
            callback(null);
        });
    });
}

```
这样代码结构，功能都一目了然
