import { Router } from "express"
import OrderController from "../controllers/order.controller.js"

const router = new Router()

router.get('/', OrderController.getAll)
router.get('/orderId/:orderId', OrderController.getOne)

export default router