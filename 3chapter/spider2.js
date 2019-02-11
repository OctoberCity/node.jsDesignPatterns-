const path = require("path");
const request = require("request");
const mkdirp = require("mkdirp");
const fs = require("fs");


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









function urlToFilename() {
    return null;
}






//文件执行入口
spider(process.argv[2], (error, filename, isdownload) => {
    if (error) {
        console.log(error);
    }

    if (isdownload) {
        console.log(`这个是新下载的文件${filename}`);
    } else {
        console.log(`这个是已经下载的文件${filename}`);

    }

});