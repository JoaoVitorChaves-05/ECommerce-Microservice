import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

class Database {
    constructor() {
        this.connection = new Sequelize(`${process.env.DATABASE_URL}`)
        this.models = {}
    }
}

export default new Database ();