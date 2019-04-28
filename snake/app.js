 const stream = require("stream");
 var keypress = require('keypress');

 // 可写
 let haveHeight = false;
 let haveWidth = false;
 let haveWinContent = false;
 let mapIsFinish = false;
 let mapIsBegin = false;

 const scheduleValues = [0];


 // 用户输入
 let height = 0;
 let width = 0;
 let allwinCon = '';
 let allwinConNum = 0;



 // 地图参数

 let mapItem = "                 ";
 const line = '';
 let isGameOver = false;
 let game;

 // 果实状态
 let randomH = Math.floor(Math.random() * height);
 let randomW = Math.floor(Math.random() * width);
 let foodIsBeEat = false; //true代表被吃

 // 蛇的身体 ,每次循环，做列表截取后一个取前一个位置，最前的位置为最后的元素

 let snakeMoveDir = 'right';
 let snake = [{
    x: 1,
    y: 1,
    content: '※',
    dir: snakeMoveDir
}];
let nowPaintSnakeItem = snake[0];





 // 工具变量
 const enterBufer = Buffer.from(['0d', '0a']);

 // 工具方法
 function isEmpty(value) {
     return value === 'undefined' || value === undefined || value === null || value === '';
 }

 function judgeEnterBuffer(buffer) {
     console.log(buffer.toString());
     return buffer.equals(enterBufer)
 }
//  随机生成食物
 function proFood() {
     randomH = Math.floor(Math.random() * height);
     randomW = Math.floor(Math.random() * width);
     foodIsBeEat = false;
 }

 // 判断蛇item在地图的单位是否有
 function judgeSnakeItem(x, y) {
     return snake.some((item, index) => {
         if (item.x + '' + item.y != x + '' + y)
             return false;
         nowPaintSnakeItem = item;
         return true
     });
 }
 // 判断蛇是否触碰墙体,以及自身
 function judgeSnakeDie(newLastItem){
       if(newLastItem.x === width || newLastItem.y === height){
         isGameOver= true
       }
   
       
    

 }

 // 更新蛇身
 function updateSnakeBody() {
     const snakeLen =snake.length;
     let {
         x,
         y,
         content
         
     } = snake[snakeLen - 1]; 
     switch(snakeMoveDir){
         case 'top':
          y--;  
         break;
         case 'down':
         y++
         break;
         case 'left':
         x--
         break;
         case 'right':
         x++
         break;
     }
     const newLastItem = {
        x,
        y,
        content,
        dir: snakeMoveDir
     }
    // 判断是否死亡
    judgeSnakeDie(newLastItem); 
    snake.push(newLastItem) 
    snake.forEach((item,index)=>{
         if(index === 0 ) return; 
         snake[snakeLen-index].content = snake[snakeLen-1] 
     });   
     snake.shift(); 
 }


 console.log("你好欢迎来到Stream,输入begin开始游戏，按回车确认。");

 function jude(value) {
     if (scheduleValues[0] !== 'begin') {
         console.log("你好欢迎来到Stream,输入begin开始游戏，按回车确认。");
     } else if (scheduleValues[0] === 'begin' && scheduleValues.length === 1) {
         console.log("请输入地域长，按回车确认");
     } else if (scheduleValues.length === 2) {
         console.log("请输入地域宽，按回车确认");
     } else if (scheduleValues.length === 3) {
         console.log("请输入胜利果实的内容");
     }
 }


 function setScheduleValue(value) {
     let schedule = 0;
     if (value == 'begin') {
         schedule = 4;
     } else if (scheduleValues.length === 1 && typeof (value - 0) === 'number') {
         schedule = 1;
     } else if (scheduleValues.length === 2 && typeof (value - 0) === 'number') {
         schedule = 2;
     } else if (scheduleValues.length === 3) {
         schedule = 3;
     } 
     switch (schedule) {
         case 1: //设置长
             height = value - 0;
             haveHeight = true;
             scheduleValues[1] = true;
             break;
         case 2: //设置宽
             width = value - 0;
             haveWidth = true;
             scheduleValues[2] = true;
             break;
         case 3: //设置内容
             allwinCon = value.split('');
             haveWinContent = true;
             scheduleValues[3] = true;
             console.log(`确认消息，你设置的地图长==${height},地图宽为${width},设置的胜利果实为=》》${allwinCon.join('')}`)
             console.log('确认无误,回车开始生成地图');
             mapIsFinish = true;
             break;
         case 4: // 开始判断
             scheduleValues[0] = 'begin';
             break;
         case 5: //重新设置用户
             break;
         default:
             return;
     }
 }

 // 结束游戏
 function gameover() {
     clearInterval(game);
     console.log("===============================game is over================================");
 }



 // body
 function paintGame() {
     game = setInterval(() => {
          console.clear();
         if (foodIsBeEat) {
             proFood();
         }
         let map = ''
         for (let i = 0; i < height; i++) {
             let mapline = '\n' + mapItem;
             for (let j = 0; j < width; j++) {
                 if (i === randomH && j === randomW) {
                     mapline += ' ' + allwinCon[allwinConNum]; //果实
                 } else if (judgeSnakeItem(j, i)) {
                     mapline += ' ' + nowPaintSnakeItem.content; // 蛇
                 } else {
                     mapline += ' ▇';
                 }
             }
             map += mapline;
         }
         console.log(map);
         // 跟新蛇身
         updateSnakeBody();
         if (isGameOver) {
             gameover();
         }
     }, 1000);
 }





 // 设置键盘事件
 process.stdin.on('keypress', function (ch, key) {
     if (key && key.ctrl && key.name == 'c') {
         process.stdin.pause();
     } 
     if (key &&(key.name == 'right'||key.name == 'up'||key.name == 'left'||key.name == 'down') && snakeMoveDir !== key.name) { 
        snakeMoveDir= key.name;
     }

 });



 const outstream = new stream.Writable({
     write(chunk, encoding, cb) {
         const chunkstring = chunk.slice(-chunk.length, -2).toString();
         if (!mapIsFinish) {
             setScheduleValue(chunkstring);
             jude(chunkstring);
         }     
         if (isEmpty(game) && mapIsFinish) {
            keypress(process.stdin);
             paintGame();
             process.stdin.setRawMode(true);
             process.stdin.resume();
         }

         cb();
     }
 })
 process.stdin.pipe(outstream);

 