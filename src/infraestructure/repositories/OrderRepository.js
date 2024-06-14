import { Order, OrderItem } from '../../domain/entities/Order.js'
import OrderModel from '../models/Order.js'
import ProductOrder from '../models/ProductOrder.js'

class OrderRepository {
    async save(customerId, totalPrice, status) {
        await OrderModel.create(new Order(customerId, status, totalPrice))
    }

    async vinculate(orderId, orderItems) {
        for (let i = 0; i < orderItems.length; i++)
            await ProductOrder.create({ orderId, ...new OrderItem(orderItems[i].productId, orderItems[i].pricePerUnit, orderItems[i].quantity)})
    }

    async desvinculate(orderId) {
        await ProductOrder.destroy({
            where: { orderId: orderId}
        })
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
            { where: { orderId: order.orderId } }
        )
    }

    async destroy(orderId) {
        await OrderModel.destroy({ where: { orderId: orderId } });
    }
}

export default new OrderRepository()