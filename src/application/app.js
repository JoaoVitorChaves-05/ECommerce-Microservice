import express from 'express'
import order from './routes/order.routes.js'
import product from './routes/product.routes.js'
import customer from './routes/customer.routes.js'

import swaggerUi from 'swagger-ui-express'

const swaggerFile = await import('./swagger-output.json', { assert: { type: 'json' } })

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
        this.app.use('/customer', customer)
        this.app.use('/product', product)
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile.default))
    }
}

export default new App().app