
import database from "../infraestructure/database.js";
import models from "../infraestructure/models/index.js";
import { consumer, selectUseCase } from "../infraestructure/services/Consumer.js";
import app from "./app.js";


(async () => {
    try {
        await database.connection.sync();
        console.log('Database synchronized successfully.');
        consumer.create(selectUseCase)
        app.listen(3000, () => console.log('Running on http://localhost:3000'));
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
})()
