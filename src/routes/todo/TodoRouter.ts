import { Router, Request, Response, NextFunction } from "express";
import TodoController from "./TodoController";
import { RequestBody } from "../../interfaces/db-models/TodoAttributes";
import { ParamsDictionary } from 'express-serve-static-core';

const todoController = new TodoController();

const TodoRouter = Router();

TodoRouter.get("/todos", 
    (req, res, next) => todoController.getAllTodos()
    .then(data => res.json(data))
    .catch(next));

TodoRouter.post("/addtodo", (req: Request<ParamsDictionary, RequestBody>, res: Response, next: NextFunction) => {
    todoController.addTodo(req, req.body as RequestBody)
        .then(data => res.json(data))
        .catch(next);
});
    

// TodoRouter.get("/todos", TodoController.getAllTodos);
// TodoRouter.get("/todoid", TodoController.getTodoById);
// TodoRouter.get("/byuserid", TodoController.getTodosByUserId);
// TodoRouter.post("/addtodo", TodoController.addTodo);
// TodoRouter.put("/updatetodo", TodoController.updateTodo);
// TodoRouter.put("/marktodo", TodoController.markTodo);
// TodoRouter.delete("/deletetodo", TodoController.deleteTodo);

export default TodoRouter;
