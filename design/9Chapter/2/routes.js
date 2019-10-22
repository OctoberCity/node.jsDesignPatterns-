const asyncWapper =require('./asyncWapper');
module.exports.say=(req,res)=>{
    asyncWapper.tellmesome((err,message)=>{
    if(err){
        res.writeHead(500);
        return res.end(err.message);
    }
    res.writeHead(200);
    res.end(message);
});
}
