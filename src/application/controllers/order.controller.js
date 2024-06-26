import GetAllOrders from "../../domain/use_cases/order/GetAll.js";
import GetOneOrder from "../../domain/use_cases/order/GetOne.js";
import PostOneOrder from "../../domain/use_cases/order/PostOne.js";
import UpdateOneOrder from "../../domain/use_cases/order/UpdateOne.js";
import DeleteOneOrder from "../../domain/use_cases/order/DeleteOne.js";
import CalculateTotalPrice from "../../domain/use_cases/product/CalculateTotalPrice.js";
import Producer from "../../infraestructure/services/Producer.js"

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

        //const result = await PostOneOrder.execute(customerId, orderItems, totalPrice, 'PENDING')

        //Producer.sendMessage('order_created', { ...result, orderItems: orderItems })

        Producer.sendMessage('order_created', {customerId, totalPrice, status: 'PENDING', orderItems: orderItems})

        return res.status(200).json(200)
    }

    async updateOrder(req, res) {
        const { customerId, orderItems, orderId } = req.body

        if (!customerId || !orderItems || !orderId)
            return res.status(404).json({ error: "Missing data"})

        const totalPrice = await CalculateTotalPrice.execute(orderItems)

        if (!totalPrice)
            return res.status(301).json({ error: "The order items has an invalid productId" })

        //const result = await UpdateOneOrder.execute(orderId, orderItems, totalPrice)

        /*Producer.sendMessage('order_updated', {
            ...result,
            orderItems: orderItems,
        })*/

        Producer.sendMessage('order_updated', {
            orderId,
            orderItems,
            totalPrice
        })

        return res.status(200).json(200)
    }

    async deleteOrder(req, res) {
        const { customerId, orderId } = req.body

        if (!customerId || !orderId)
            return res.status(301).json({ error: "Missing data"})

        /*
        const result = await DeleteOneOrder.execute(customerId)

        if (!result)
            return res.status(301).json({ error: "The orderId is not valid or inexists" })
        */

        Producer.sendMessage('order_deleted', {
            orderId,
            customerId,
        })

        return res.status(200).json("Message received")
    }
}

export default new Order();