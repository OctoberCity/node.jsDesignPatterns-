const  stream = require('stream');
class ParallelStream extends stream.Transform{
    constructor(userTransform){
        super({objectMode:true});
        this.userTransform= userTransform;
        this.running=0;
        this.terminacallback=null;
    }

    _transform(chunk,encoding,done){
        this.running++;//每当新数据过来加一
        this.userTransform(chunk,encoding,this.push.bind(this),this._onComplete.bind(this));
        done();
    }
    _flush(){
        if(this.running>0){
            this.terminacallback=done;
        }else{
            done();
        }
    }
    _onComplete(err){
        this.running--;
        if(err){
            this.emit("error",err);
        }
        if(this.running===0){
            this.terminacallback && this.terminacallback(); 
        }

    }





}
module.exports=ParallelStream;