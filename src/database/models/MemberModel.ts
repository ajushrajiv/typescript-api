import { DataTypes, Model, Optional } from "sequelize";
import todoSequelize from "../setup/database"
import { MemberAttributes } from "../../interfaces/db-models/MemberAttributes";

interface MemberCreationAttributes
    extends Optional<MemberAttributes, "id"  > {}

class MemberModel
    extends Model<MemberAttributes, MemberCreationAttributes> 
    implements MemberAttributes
    {
        public id!: number;
        public userId!: number;
        public firstName!: string;

        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    //   id:1, 
    //   userId:1,
    //   task: "buy grocery",
    //   doBefore:new Date("2024-02-16"),
    //   completed:true
    MemberModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    { tableName:"members", sequelize: todoSequelize }
    )

export default MemberModel;