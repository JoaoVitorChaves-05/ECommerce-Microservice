import { Router } from "express"
import OrderController from "../controllers/order.controller.js"

const router = new Router()

router.get('/', OrderController.getAll)
router.get('/orderId/:orderId', OrderController.getOne)

router.post('/', OrderController.postOrder)
router.put('/', OrderController.updateOrder)
router.delete('/', OrderController.deleteOrder)

export default router