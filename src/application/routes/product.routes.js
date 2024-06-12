import { Router } from "express"
import ProductController from "../controllers/product.controller.js"

const router = new Router()

router.get('/', ProductController.getAll)
router.get('/productId/:productId', ProductController.getOne)

router.post('/', ProductController.postProduct)
router.put('/', ProductController.updateProduct)
router.delete('/', ProductController.deleteProduct)

router.post('/unit', ProductController.addUnit)
router.delete('/unit', ProductController.removeUnit)

export default router