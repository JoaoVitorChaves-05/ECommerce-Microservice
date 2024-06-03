import OrderRepository from "../../../infraestructure/repositories/OrderRepository.js"

class PostOneOrder {
    constructor() {}
    async execute(customerId, orderItems, totalPrice, status) {
        try {
            const resultOrder = await OrderRepository.save(customerId, totalPrice, status)
            .then(res => res.toJSON())
            const resultProductOrder = await OrderRepository.vinculate(customerId, orderItems)

            return resultOrder
        } catch (e) {
            return { error: e }
        }
    }
}

export default new PostOneOrder();