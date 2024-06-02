import { Order } from '../../domain/entities/Order.js'
import OrderModel from '../models/Order.js'

class OrderRepository {
    async save(customerId, totalPrice, status) {
        await OrderModel.create(new Order(customerId, totalPrice, status))
    }

    async vinculate(orderId, orderItems) {
        await OrderModel.vinculate(orderId, orderItems)
    }

    async findById(orderId) {
        const orderRecord = await OrderModel.findByPk(orderId)
        if (!orderRecord) return null
    
        return new Order(
          orderRecord.customerId,
          orderRecord.totalPrice,
          orderRecord.status
        )
    }

    async findAll() {
        const orderRecords = await OrderModel.findAll()
        .then(res => res.map(el => el.toJSON()))
        return orderRecords.map(orderRecord => new Order(orderRecord.customerId, orderRecord.status, orderRecord.totalPrice))
    }

    async update(order) {
        await OrderModel.update(
            {
                customerId: order.customerId,
                totalPrice: order.totalPrice,
                status: order.status,
            },
            { where: { id: order.orderId } }
        )
    }

    async destroy(orderId) {
        await OrderModel.destroy({ where: { id: orderId } });
    }
}

export default new OrderRepository();