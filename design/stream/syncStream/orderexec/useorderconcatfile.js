const orderconcatfile=require('./ordercancatfile');
const resultfile = process.argv[2];
const files =process.argv.slice(3);
orderconcatfile(resultfile,files,()=>{
  console.log("完结");
});