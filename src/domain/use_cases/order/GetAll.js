import OrderRepository from "../../../infraestructure/repositories/OrderRepository.js"

class GetAllOrders {
    constructor() {
        this.orderRepository = OrderRepository
    }

    async execute() {
        return await this.orderRepository.findAll()
    }
}

export default new GetAllOrders();