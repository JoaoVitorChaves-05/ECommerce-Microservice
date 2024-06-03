import GetAllOrders from "../../domain/use_cases/order/GetAll.js";
import GetOneOrder from "../../domain/use_cases/order/GetOne.js";
import PostOneOrder from "../../domain/use_cases/order/PostOne.js";
import UpdateOneOrder from "../../domain/use_cases/order/UpdateOne.js";
import CalculateTotalPrice from "../../domain/use_cases/product/CalculateTotalPrice.js";
import Producer from "../../../infraestructure/services/Producer.js"

class Order {
    async getAll(req, res) {
        const result = await GetAllOrders.execute()
        return res.status(200).json(result)
    }

    async getOne(req, res) {
        if (!req.params.orderId)
            return res.status(404).json({ error: "OrderId not specified"})

        const result = await GetOneOrder.execute(req.params.orderId)

        return res.status(200).json(result)
    }

    async postOrder(req, res) {
        const { customerId, orderItems } = req.body

        if (!customerId || !orderItems)
            return res.status(404).json({ error: "Missing data"})

        const totalPrice = await CalculateTotalPrice.execute(orderItems)

        if (!totalPrice)
            return res.status(301).json({ error: "The order items has an invalid productId" })

        const result = await PostOneOrder.execute(customerId, orderItems, totalPrice, 'PENDING')

        Producer.sendMessage('order_created', { ...resultOrder, orderItems: orderItems })

        return res.status(200).json(result)
    }

    async updateOrder(req, res) {
        const { customerId, orderItems, orderId } = req.body

        if (!customerId || !orderItems || !orderId)
            return res.status(404).json({ error: "Missing data"})

        const totalPrice = await CalculateTotalPrice.execute(orderItems)

        if (!totalPrice)
            return res.status(301).json({ error: "The order items has an invalid productId" })

        const result = await UpdateOneOrder.execute(orderId, orderItems, totalPrice)

        Producer.sendMessage('order_updated', {
            ...result,
            orderItems: orderItems,
        })

        return res.status(200).json(result)
    }

    async deleteOrder(req, res) {
        const { customerId } = req.body

        if (!customerId)
            return res.status(301).json({ error: "Missing data"})

        const result = await DeleteOneOrder.execute(customerId)

        return res.status(200).json(result)
    }
}

export default new Order();