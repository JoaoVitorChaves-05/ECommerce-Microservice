import OrderRepository from "../../../infraestructure/repositories/OrderRepository.js"

class DeleteOneOrder {
    constructor() {}
    async execute(orderId) {
        try {
            const result = await OrderRepository.destroy(orderId)
            .then(res => res.toJSON())

            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default new DeleteOneOrder()