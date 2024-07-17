// src/routes/todo/todoController.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Request,
  SuccessResponse,
  Tags,
  Query,
  Put,
  Delete
} from '@tsoa/runtime';
import { Request as ExpressRequest } from 'express';
import { StatusCodes } from 'http-status-codes';
import TodoModel from '../../database/models/TodoModel';
import { TodoAttributes, RequestBody } from "../../interfaces/db-models/TodoAttributes";

export type TodoResponse = boolean;


@Route('v1/todo')
@Tags('Todo')
class TodoController extends Controller {
  @Get('/todos')
  @SuccessResponse(StatusCodes.OK)
  public async getAllTodos(): Promise<TodoAttributes[]> {
    const todos = await TodoModel.findAll();
    return todos as TodoAttributes[];
  }

  @Post('/addtodo')
  @SuccessResponse(StatusCodes.CREATED)
  public async addTodo(
    @Request() req: ExpressRequest,
    @Body() body: RequestBody,
  ): Promise<TodoResponse | Error> {
    const { newTask, newCompleted, newDoBefore, newUserId } = body;

    const newTodo: Omit<TodoAttributes, 'id'> = {
      task: newTask,
      completed: newCompleted === "true",
      doBefore: new Date(newDoBefore),
      userId: parseInt(newUserId, 10)
    };

    await TodoModel.create(newTodo);
    return true;
  }

  @Get('/todoid')
  public async getTodoById(@Query() todoId: string) {
    if (!todoId) {
      this.setStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const todo = await TodoModel.findOne({ where: { id: todoId } });
    return todo as TodoAttributes;
  }

  @Get('/byuserid')
  public async getTodosByUserId(@Query() userId: number): Promise<TodoAttributes[]> {
    const todos = await TodoModel.findAll({ where: { userId } });
    return todos;
  }

  @Put('/updatetodo')
  public async updateTodo(
    @Request() req: ExpressRequest,
    @Body() body: RequestBody,
  ):  Promise<TodoResponse | Error> {
    const { todoId, newTask, newDoBefore, newCompleted } = body;

    await TodoModel.update(
      {
        task: newTask,
        completed: newCompleted === "true",
        doBefore: new Date(newDoBefore),
      },
      { where: { id: todoId } },
    );

    await TodoModel.findByPk(todoId);
    return true;
  }

  @Put('/marktodo')
  public async markTodo(
    @Request() req: ExpressRequest,
    @Body() body: RequestBody,
  ):  Promise<TodoResponse | Error> {
    const { newCompleted, todoId } = body;

    await TodoModel.update(
      {
        completed: newCompleted === "true"
      },
      { where: { id: todoId } },
    );

    await TodoModel.findByPk(todoId);
    return true;
  } 

  @Delete('/deletetodo')
  public async deleteTodo(
    @Request() req: ExpressRequest,
    @Body() body: RequestBody,
    ):  Promise<TodoResponse | Error> {
      const { todoId } = body;
  
      const deleted = await TodoModel.destroy({ where: { id: todoId } });
      if (deleted) {
        return true;
      } else {
        this.setStatus(StatusCodes.NOT_FOUND);
        return false;
      }
    }
}

export default TodoController;
