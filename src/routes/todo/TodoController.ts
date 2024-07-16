import {
    Body,
    Controller,
    Get,
    Post,
    Route,
    Request,
    SuccessResponse,
    Tags,
  } from '@tsoa/runtime';
  import { Request as ExpressRequest } from 'express';
  import { StatusCodes } from 'http-status-codes';
  import TodoModel from '../../database/models/TodoModel';
  import { TodoAttributes, RequestBody } from "../../interfaces/db-models/TodoAttributes"
  
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
  
  }
  
  export default TodoController;
  