import type { Request, Response } from 'express';

import { todoSchema, type Todo } from '../../schema/todo.schema.js';

export class TodoController {
  private _todo: Todo[] = [];

  public handleGetAllTodos(req: Request, res: Response): Todo[] {
    const todos = this._todo;
    res.json(todos);

    return this._todo;
  }

  public handleCreateTodo(req: Request, res: Response): void {
    const rawBody = req.body;
    const validateResult = todoSchema.safeParse(rawBody);
    if (!validateResult.success) {
      res.status(400).json({
        error: 'Invalid request body',
        details: validateResult.error.flatten(),
      });

      return;
    }

    const newTodo = validateResult.data;
    this._todo.push(newTodo);
    res.status(201).json(newTodo);
  }
}
