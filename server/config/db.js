require('dotenv').config();

const mysql = require('mysql2');

// 配置数据库连接池
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,  // 等待连接池中的连接释放
    connectionLimit: 10,       // 最大连接数
    queueLimit: 0              // 连接队列限制，0表示不限制
})

const promisePool = pool.promise();


// 启动时测试连接
const checkConnection = async () => {
    try {
        await promisePool.query('SELECT 1');
        console.log('数据库连接成功');
    } catch (err) {
        console.error('数据库连接失败:', err.message);
        console.error('请检查 .env 文件配置是否正确');
    }
};

// 执行检查
checkConnection();

// 导出 promisePool 供其他文件使用
module.exports = promisePool;
