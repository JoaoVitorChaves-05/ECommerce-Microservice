import express from 'express'
import order from './routes/order.routes.js'

class App {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/order', order)
        
    }
}

export default new App().app