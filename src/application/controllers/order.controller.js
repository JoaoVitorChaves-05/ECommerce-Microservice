import GetAll from "../../domain/use_cases/order/GetAll";

class Order {
    getAll(req, res) {
        const result = GetAll()
        return res.status(200).json(result)
    }
}

export default new Order();