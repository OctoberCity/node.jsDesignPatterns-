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