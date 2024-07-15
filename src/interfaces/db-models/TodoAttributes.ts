export interface TodoAttributes {
  id?: number;
  userId: number;
  task: string;
  completed?: boolean;
  doBefore: Date | string;
}

export interface RequestBody {
  todoId?: string;
  newTask: string;
  newCompleted: string;
  newDoBefore: string;
  newUserId: string;
}
