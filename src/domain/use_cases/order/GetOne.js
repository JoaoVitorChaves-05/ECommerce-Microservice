import OrderRepository from "../../../infraestructure/repositories/OrderRepository.js"

class GetOneOrder {
    constructor() {
        this.orderRepository = OrderRepository
    }

    async execute(orderId) {
        const result = await this.orderRepository.findById(orderId)
        return result
    }
}

export default new GetOneOrder();