import OrderRepository from "../../../infraestructure/repositories/OrderRepository.js"

class PostOneOrder {
    constructor() {}
    async execute(customerId, orderItems, totalPrice, status) {
        try {
            const resultOrder = await OrderRepository.save(customerId, totalPrice, status)
            const resultProductOrder = await OrderRepository.vinculate(customerId, orderItems)
            return true
        } catch (e) {
            return { error: e}
        }
    }
}

export default new PostOneOrder();