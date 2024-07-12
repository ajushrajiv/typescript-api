import {Sequelize} from "sequelize"

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

const todoSequelize = new Sequelize(DB_NAME as string, DB_USERNAME as string, DB_PASSWORD, {
    host:"localhost",
    dialect:"mysql"
})

export default todoSequelize;