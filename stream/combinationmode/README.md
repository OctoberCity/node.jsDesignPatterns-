### 管道模式
stream可以按照不同的模式连接起来，可以将多个流合并在一起，可以将一个流分成多个流或者更多，也可以重定向流，其模式有
- #### 组合流
组合流，顾名思义，我们可以将多个流组合起来
> 当向组合流中写入数据的时候，其实是向组合流中第一个流写入数据

> 当向组合流中读取数据的时候，其实是向组合流中最后一个流写入数据

组合流给外界的印象是一个整体，外界不知道内部的结构，并且简化了错误管理只要对整个组合流添加错误监听器即可。

- 如何实现一个组合流

我们借用两个交换流的进行组合，达到加密解密压缩信息的功能。利用multipipe生成组合流.
[代码](./combinestream)
```
const zlib = require("zlib");// 压缩解压
const crypto = require("crypto");//加密解密
const stream = require('multipipe');// 生成组合流

module.exports.compressAndEncrypt=(password)=>{//压缩加密
    return stream(
     zlib.createGzip()
    ,crypto.createCipher('aes192',password)//对称加密，采用相同秘钥加密解密
);
}
module.exports.decryptAndDecompress=(password)=>{//解密解压缩
    return stream( 
    crypto.createDecipher('aes192',password),
    zlib.createGunzip() 
);
}
```




