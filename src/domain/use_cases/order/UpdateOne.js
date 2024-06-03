import OrderRepository from "../../../infraestructure/repositories/OrderRepository.js"

class UpdateOneOrder {
    constructor() {}
    async execute(orderId, orderItems, totalPrice) {

        try {
            const { status } = await OrderRepository.findById(orderId)
            await OrderRepository.desvinculate(orderId)
            await OrderRepository.vinculate(orderId, orderItems)

            const result = await OrderRepository.update({ orderId: orderId, totalPrice: totalPrice, status: status })
            .then(res => res.toJSON())

            return result
        } catch (e) {
            console.error(e)
            return null
        }

    }
}

export default new UpdateOneOrder()