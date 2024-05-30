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
}

export default new Order();