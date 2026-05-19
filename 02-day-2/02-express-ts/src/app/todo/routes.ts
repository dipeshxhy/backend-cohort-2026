import { Router } from 'express';
import { TodoController } from './controller.js';

const todoController = new TodoController();

const todoRouter: Router = Router();

todoRouter.get('/', todoController.handleGetAllTodos.bind(todoController));

todoRouter.post('/', todoController.handleCreateTodo.bind(todoController));

todoRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Get todo with id ${id}`);
});

todoRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Update todo with id ${id}`);
});

todoRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Delete todo with id ${id}`);
});
//#endregion
export default todoRouter;
