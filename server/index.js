require('dotenv').config();
require('./config/db');

const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

// 1. 打印一下，证明代码开始跑了
console.log("正在尝试启动 InkHub 后端...");



// 3.基础路由
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('InkHub Backend is Running!');
});


app.listen(port, () => {
    console.log(`-------------------------------------------`);
    console.log(`服务已启动!`);
    console.log(`监听端口: ${port}`);
    console.log(`访问地址: http://localhost:${port}`);
    console.log(`-------------------------------------------`);
});