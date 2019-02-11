const Transtream =require("./transtream");
const tst =new Transtream("hjw",'xm');
tst.on('data',(chunk)=>{
 console.log(`接收的数据是${chunk.toString()}`);
});

tst.write('doubishi h');
tst.write('jw hjwdsddd!');
tst.end();