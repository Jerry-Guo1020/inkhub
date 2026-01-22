const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// 1. 打印一下，证明代码开始跑了
console.log("正在尝试启动 InkHub 后端...");

// 2. 配置数据库连接池
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 3.基础路由
app.get('/', (req, res) => {
    res.send('InkHub Backend is Running!');
});

// 4. 测试数据库连接的路由
app.get('/test-db', (req, res) => {
    pool.query('SELECT NOW() as now', (err, results) => {
        if (err) {
            console.error('数据库连接失败:', err);
            return res.status(500).json({ error: 'Database connection failed', details: err.message });
        }
        res.json({ 
            status: 'Success', 
            message: 'Connected to MySQL!', 
            db_time: results[0].now 
        });
    });
});

// 5. 【关键】启动监听！没有这一步，程序就会直接退出
app.listen(port, () => {
    console.log(`-------------------------------------------`);
    console.log(`服务已启动!`);
    console.log(`监听端口: ${port}`);
    console.log(`访问地址: http://localhost:${port}`);
    console.log(`-------------------------------------------`);
});