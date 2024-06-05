import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

class Database {
    constructor() {
        console.log(process.env.DATABASE_URL)
        this.connection = new Sequelize(`${process.env.DATABASE_URL}`)
        this.models = {}
    }
}

const database = new Database()

export default database