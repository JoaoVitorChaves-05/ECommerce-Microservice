import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

class Database {
    constructor() {
        this.connection = new Sequelize(`mysql://${process.env.MYSQL_USERNAME}@${process.env.MYSQL_PASSWORD}:${process.env.MYSQL_PORT}/${process.env.MYSQL_NAME}`)
    }
}

export default new Database ();