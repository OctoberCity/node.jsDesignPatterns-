const Generatewrite= require('./generatewrite');
const genwrite =new  Generatewrite();
genwrite.write({path:'test.txt',content:'胡佳文测试'});
genwrite.end(()=>{console.log("流结束了");});