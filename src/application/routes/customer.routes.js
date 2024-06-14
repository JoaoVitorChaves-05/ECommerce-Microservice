import { Router } from "express"
import CustomerController from "../controllers/customer.controller.js"

const router = new Router()

router.get('/', CustomerController.getAll)
router.get('/customerId/:customerId', CustomerController.getOne)

router.post('/', CustomerController.postOne)
router.put('/', CustomerController.updateOne)
router.delete('/', CustomerController.deleteOne)

export default router