const db = require('../config/db');

// 获取所有的任务
exports.getAllTasks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM todos');
        res.json(rows);
    } catch (err) {
        console.error('获取任务失败:', err.message);
        res.status(500).json({ error: err.message });
    }
}

// 添加任务
exports.createTodo = async (req, res) => {
    try{
        const { task } = req.body;
        if (!task) {
            return res.status(400).json({ error: '任务内容不能为空' });
        }
        const [result] = await db.query('INSERT INTO todos (task, status) VALUES (?, ?)', [task, 'todo'] );
        res.json({
            id: result.insertId,
            task,
            status: 'todo'
        })
    } catch (err) {
        console.error('添加任务失败:', err.message);
        res.status(500).json({ error: err.message });
    }
}

// 删除任务
exports.deleteTodo = async (req, res) => {
    try {
        const [raws] = await db.query('DELETE FROM todos WHERE id = ? ', [req.params.id]);
        if (raws.affectedRows === 0) {
            return res.status(404).json({ error: '任务不存在' });
        }
        res.json({ message: '任务删除成功' });
    } catch (err) {
        console.error('删除任务失败:', err.message);
        res.status(500).json({ error: err.message });
    }
}

// 更新任务状态
exports.updateTodoStatus = async (req, res) => {
    try {
        const {id} = req.params
        const {status} = req.body
        if(!['todo', 'done'].includes(status)) {
            return res.status(400).json({error: "状态无效"})
        }
        const [result] = await db.query('UPDATE todos SET status = ? WHERE id = ?', [status, id])
        if (result.affectedRows === 0) {
            return res.status(404).json({error: "任务不存在"})
        } else {
            res.json({message: "状态更新成功"})
        }

    } catch (err) {
        console.error("有问题", err)
        res.status(500).json({
            error: err.message
        })
    }
}
