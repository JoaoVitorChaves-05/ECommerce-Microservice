import GetAllConsumers from "../../domain/use_cases/customer/GetAll.js"
import GetOneConsumers from "../../domain/use_cases/customer/GetOne.js"
import Producer from "../../infraestructure/services/Producer.js"

class CustomerController {
    async getAll(req, res) {
        const result = await GetAllConsumers.execute()
        return res.status(200).json(result)
    }

    async getOne(req, res) {
        if (!req.params.customerId)
            return res.status(301).json({ error: "Customer Id not specified" })

        const result = await GetOneConsumers.execute(req.params.customerId)

        return res.status(200).json(result)
    }

    async postOne(req, res) {
        const { name, email, password } = req.body

        if (!name || !email || !password)
            return res.status(301).json({ error: "Missing data" })

        Producer.sendMessage('custumer_added', { name: name, email: email, password: password })

        return res.status(200).json(200)
    }

    async updateOne(req, res) {
        const { email, password, newData } = req.body

        if (!email || !password || !newData)
            return res.status(301).json({ error: "Missing data" })

        Producer.sendMessage('custumer_updated', { email: email, password: password, newData: newData })

        return res.status(200).json(200)
    }

    async deleteOne(req, res) {
        const { email, password } = req.body

        if (!email || !password)
            return res.status(301).json({ error: "Missing data" })

        Producer.sendMessage('custumer_deleted', { email: email, password: password })

        return res.status(200).json(200)
    }
}

export default new CustomerController()