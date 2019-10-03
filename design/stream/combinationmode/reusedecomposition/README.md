### 复用和分解 （重点）
```
通道1===                                  ====》通道a  
        ====》                        ====
              复用 ==》共享通道==》 分解
        ====》                        ====
通道2 ===                                 ====》通道b 
```
将多个流合并在一起，成为一个流，以便使用其传输数据的模式称为复用（multiplexing）,其由装置mux完成，而将共享通道中的数据重新构建原始流的操作叫分解,其由装置demux完成。

- 构建一个远程日志系统
> 启动子线程，将标准输出和标准错误重定向给远程服务器，tcp连接是共享的数据，将标准错误，标准输出复用，而如何定义共享数据格式即在分解时候有分解标准，我们使用分组交换的技术，该技术在tcp/ip,广播（udp）中也会使用，我们熟知的7层协议，以及http四层协议，其传输的数据结构是由信息头+数据，当然其数据结构比这个远程日志系统的协议结构要复杂的多的多。
```
// 该例子的数据结构
通道id(1byte) +  数据长度(4byte)  +   数据
```