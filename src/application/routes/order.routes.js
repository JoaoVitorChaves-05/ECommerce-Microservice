import { Router } from "express"

const router = new Router()

router.get('/', OrderController)

export default router