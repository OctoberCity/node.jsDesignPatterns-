#### 双工流Duplex stream
双向流，可读也可写。其同时继承stream.Readable stream.Writable.所以如果自定义双向流，我们必须实现_read以及_write两个方法，对于传递的options比可读多了一个allowHalfOpen(默认true),如果设置false那么当读或者写的部分出了问题那么整个流都会终止。