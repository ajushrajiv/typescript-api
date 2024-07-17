import { Router } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import TodoModel from "../../database/models/TodoModel";
import { RequestBody } from "../../interfaces/db-models/TodoAttributes";

const TodoRouter = Router();

//return all todos
//http://localhost:5030/v1/todo/todos
TodoRouter.get("/todos", async (req, res) => {
  const todos = await TodoModel.findAll();
  res.status(StatusCodes.OK).send(todos);
});

//return a single todo
// http://localhost:5030/v1/todo/todoid?todoId=1
//key: todoId , value:1

TodoRouter.get("/todoid", async (req, res) => {
  const todoId = parseInt(req.query.todoId as string);
  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  const todo = await TodoModel.findOne({ where: { id: todoId } });
  res.status(StatusCodes.OK).json({ todo });
});

//return todos based on userId
// http://localhost:5030/v1/todo/byuserid?userId=1
// key: userId , value:1

TodoRouter.get("/byuserid", async (req, res) => {
  const userId = parseInt(req.query.userId as string);

  const todos = await TodoModel.findAll({ where: { userId } });

  res.status(StatusCodes.OK).json({ todos: todos });
});

//add a single todo
//http://localhost:5030/v1/todo/addtodo

//JSON body
// {
//   "newTask": "fertilise plants",
//   "newCompleted": false,
//   "newDoBefore": "2024-03-01",
//   "newUserId": 2
// }

TodoRouter.post("/addtodo", async (req, res) => {
  const requestBody = req.body as RequestBody;

  const newTask = String(requestBody.newTask);
  const newCompleted = Boolean(requestBody.newCompleted);
  const newDoBefore = parseInt(requestBody.newDoBefore, 10);
  const newUserId = parseInt(requestBody.newUserId, 10);

  //const { newTask, newCompleted, newDoBefore, newUserId } = req.body;
  const newTodo = {
    //id: newId,  increments the id automatically
    task: newTask,
    completed: newCompleted,
    doBefore: new Date(newDoBefore),
    userId: newUserId,
  };

  //todos.push(newTodo);
  const todo = await TodoModel.create(newTodo); // creates a element in the DB
  res.status(StatusCodes.OK).json({ todo });
});

TodoRouter.put("/updatetodo", async (req, res) => {
  //const { todoId, newTask, newDoBefore, newCompleted } = req.body;

  const requestBody = req.body as RequestBody;

  const todoId = requestBody.todoId
    ? parseInt(requestBody.todoId, 10)
    : undefined;
  const newTask = String(requestBody.newTask);
  const newDoBefore = parseInt(requestBody.newDoBefore, 10);
  const newCompleted = Boolean(requestBody.newCompleted);

  await TodoModel.update(
    {
      task: newTask,
      completed: newCompleted,
      doBefore: new Date(newDoBefore),
    },
    { where: { id: todoId } },
  );

  const todo = await TodoModel.findByPk(todoId);

  res.status(StatusCodes.OK).json({ updatedTodo: todo });
});

TodoRouter.put("/marktodo", async (req, res) => {
  const requestBody = req.body as RequestBody;

  const newCompleted = Boolean(requestBody.newCompleted);
  const todoId = requestBody.todoId
    ? parseInt(requestBody.todoId, 10)
    : undefined;

  await TodoModel.update(
    {
      completed: newCompleted,
    },
    { where: { id: todoId } },
  );

  const updatedTodo = await TodoModel.findByPk(todoId);

  res.status(StatusCodes.OK).json({ updatedTodo: updatedTodo });
});
// {
//   "id":2,
//   "newCompleted":true
// }

TodoRouter.delete("/deletetodo", async (req, res) => {
  const requestBody = req.body as RequestBody;
  const todoId = requestBody.todoId
    ? parseInt(requestBody.todoId, 10)
    : undefined;

  const deleted = await TodoModel.destroy({ where: { id: todoId } });
  if (deleted) {
    res.json({ deletedTodos: todoId });
  } else {
    res.status(404).send("Todo not found");
  }
});

export default TodoRouter;
