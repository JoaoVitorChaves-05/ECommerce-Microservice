import GetAllOrders from "../../domain/use_cases/order/GetAll.js";

class Order {
    getAll(req, res) {
        const result = GetAllOrders.execute()
        return res.status(200).json(result)
    }
}

export default new Order();