const asyncModule =require('./asyncModule');
module.exports.say=(req,res)=>{
asyncModule.tellmesome((err,message)=>{
    if(err){

        res.writeHead(500);
        return res.end(err.message);
    }
    res.writeHead(200);
    res.end(message);
});
}
