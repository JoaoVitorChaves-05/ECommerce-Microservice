import database from "../infraestructure/database.js"
import OrderModel from "../infraestructure/models/order.js"
import CustomerModel from "../infraestructure/models/Customer.js"
import app from "./app.js"
import events from "events"

(async () => {
    try {
        if (OrderModel != database.models.OrderModel)
            throw new Error("Order model must be defined")
        if (CustomerModel != database.models.Customer)
            throw new Error("Customer model must be defined")
        eventEmitter.emit('database_on')
    } catch (e) {
        console.error(e)
    }
})()

const eventEmitter = new events.EventEmitter()

eventEmitter.on('database_on', () => app.listen(3000, () => console.log('Running on http://localhost:3000')))