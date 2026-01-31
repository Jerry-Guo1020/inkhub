const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

// 定义路径与函数之间的关系
router.get('/', todoController.getAllTasks);
router.post('/', todoController.createTodo);
// router.put('/:id', todoController.updateTodoStatus);
router.delete('/:id', todoController.deleteTodo);       

module.exports = router
