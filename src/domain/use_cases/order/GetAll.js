import OrderRepository from "../../../infraestructure/repositories/OrderRepository.js"

class GetAllOrders {
    constructor() {
        this.orderRepository = OrderRepository
    }

    async execute() {
        const result = await this.orderRepository.findAll()
        return result
    }
}

export default new GetAllOrders();