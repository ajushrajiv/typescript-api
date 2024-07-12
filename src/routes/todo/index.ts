import { Router } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import TodoModel from "../../database/models/TodoModel";
import { where } from "sequelize";

let todos = [
  {
    id: 1,
    userId: 1,
    task: "buy grocery",
    doBefore: new Date("2024-02-16"),
    completed: true,
  },
  {
    id: 2,
    userId: 1,
    task: "return books",
    doBefore: new Date("2024-02-20"),
    completed: false,
  },
];

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
  //const todo = todos.find((item) => item.id == todoId)
  //const todo = await TodoModel.findByPk(todoId);
  //({ where: { title: 'My Title' } })
  const todo = await TodoModel.findOne({ where: { id: todoId } });
  res.status(StatusCodes.OK).json({ todo });
});

//return todos based on userId
// http://localhost:5030/v1/todo/byuserid?userId=1
// key: userId , value:1

TodoRouter.get("/byuserid", async (req, res) => {
  const userId =  parseInt(req.query.userId as string);

  const todos = await TodoModel.findAll({ where: { userId } });

  res.status(StatusCodes.OK).json( { todos: todos } );
});

//add a single todo
//http://localhost:5030/v1/todo/addtodo
// {
//   "todo": {
//     "id": 3,
//     "userId": 2,
//     "task": ["apple", "banana"],
//     "doBefore": "2024-03-01",
//     "completed": false
//   }
// }

//JSON body
// {
//   "newTask": "fertilise plants",
//   "newCompleted": false,
//   "newDoBefore": "2024-03-01",
//   "newUserId": 2
// }

TodoRouter.post("/addtodo", async (req, res) => {
  const { newTask, newCompleted, newDoBefore, newUserId } = req.body;
  const newTodo = {
    //id: newId,  increments the id automatically
    task: newTask,
    completed: newCompleted,
    doBefore: new Date(newDoBefore),
    userId: newUserId,
  };

  //todos.push(newTodo);
  const todo = await TodoModel.create(newTodo); // creates a element in the DB
  // console.log("ID",newTodo.id)
  // console.log("TAsK",newTodo.task)
  //res.json({todo: newTodo}),  adds the element to arraywhen there is no DB
  res.status(StatusCodes.OK).json({ todo });
});

TodoRouter.put("/updatetodo", async (req, res) => {
  const { todoId, newTask, newDoBefore, newCompleted } = req.body;

  // console.log(todoId,newTask,newDoBefore, newCompleted)
  // const currentTodo = todos.find((item) => item.id == todoId)

  //   currentTodo.task = newTask;
  //   currentTodo.completed = newCompleted;
  //   currentTodo.doBefore = new Date(newDoBefore);
  await TodoModel.update(
    {
      task: newTask,
      completed: newCompleted,
      doBefore: newDoBefore,
    },
    { where: { id: todoId } }
  );

  const todo = await TodoModel.findByPk(todoId);

  res.status(StatusCodes.OK).json({ updatedTodo: todo });
});

TodoRouter.put("/marktodo", async (req, res) => {
  const { id, newCompleted } = req.body;
  // console.log("Marked task",id, newCompleted)

  // const currentTodo = todos.find((item) => item.id == id)
  // currentTodo.completed = newCompleted

  // const newTodos =  todos.filter((item) => item.id != id)
  // newTodos.push(currentTodo);

  // todos = newTodos
  const currentTodo = await TodoModel.update(
    {
      completed: newCompleted,
    },
    { where: { id: id } }
  );

  const updatedTodo = await TodoModel.findByPk(id);

  res.status(StatusCodes.OK).json({ updatedTodo: updatedTodo });
});
// {
//   "id":2,
//   "newCompleted":true
// }

TodoRouter.delete("/deletetodo", async (req, res) => {
  const { todoId } = req.body;

  // const currentTodos =  todos.filter((item) => item.id !== toId);
  // console.log(`Deleted todo id: ${toId}`)

  const deleted = await TodoModel.destroy({ where: { id: todoId } });
  if (deleted) {
    res.json({ deletedTodos: todoId });
  } else {
    res.status(404).send("Todo not found");
  }
});

export default TodoRouter;
