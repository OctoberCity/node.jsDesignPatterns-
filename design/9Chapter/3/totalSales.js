const level = require('level');
const sublevel = require('level-sublevel');

const db = sublevel(level('./db', {valueEncoding: 'json'}));
const salesDb = db.sublevel('sales');

//基于levelUP数据库结构为json对象，{amount,item}//数量，类型
module.exports = function totalSales(item, callback) { 
  let sum = 0;
  salesDb.createValueStream() 
    .on('data', data => {
        // 数据类型相同那么数据累加
      if(!item || data.item === item) {  
        sum += data.amount;
      }
    })
    .on('end', () => {
      callback(null, sum);  
    });
};