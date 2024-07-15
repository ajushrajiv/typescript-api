import { DataTypes, Model, Optional } from "sequelize";
import todoSequelize from "../setup/database";
import { TodoAttributes } from "../../interfaces/db-models/TodoAttributes";

interface TodoCreationAttributes
  extends Optional<TodoAttributes, "id" | "completed"> {}

class TodoModel
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: number;
  public userId!: number;
  public task!: string;
  public completed!: boolean;
  public doBefore!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

//   id:1,
//   userId:1,
//   task: "buy grocery",
//   doBefore:new Date("2024-02-16"),
//   completed:true
TodoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    doBefore: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "todos", sequelize: todoSequelize },
);

export default TodoModel;
