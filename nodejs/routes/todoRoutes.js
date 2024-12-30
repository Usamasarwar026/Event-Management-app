var express = require('express');
var todoRouter = express.Router();

const {fetchTodos, getTodoById, createTodo, updateTodo, deleteTodo} = require('../controllers/todosController');
const authVerify = require('../middlewares/auth');

todoRouter.get('/', fetchTodos);
todoRouter.get('/:id',getTodoById)
todoRouter.post('/create',createTodo)
todoRouter.put('/update/:id',updateTodo)
todoRouter.delete('/delete/:id',deleteTodo)

module.exports = todoRouter;