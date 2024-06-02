import GetAllOrders from "../../domain/use_cases/order/GetAll.js";
import GetOneOrder from "../../domain/use_cases/order/GetOne.js";

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

        const result = await PostOneOrder.execute(customerId, orderItems, totalPrice)

        return res.status(200).json(result)
    }

    async updateOrder(req, res) {
        const { customerId, orderItems } = req.body

        if (!customerId || !orderItems)
            return res.status(404).json({ error: "Missing data"})

        const totalPrice = await CalculateTotalPrice.execute(orderItems)

        const result = await UpdateOneOrder.execute(customerId, orderItems, totalPrice)

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