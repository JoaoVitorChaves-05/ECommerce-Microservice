import GetAllProducts from "../../domain/use_cases/product/GetAll.js"
import GetOneProduct from "../../domain/use_cases/product/GetOne.js"
import Producer from "../../infraestructure/services/Producer.js"

class Product {
    async getAll(req, res) {
        const result = await GetAllProducts.execute()
        return res.status(200).json(result)
    }

    async getOne(req, res) {
        if (!req.params.productId)
            return res.status(404).json({ error: "Product id not specified"})

        const result = await GetOneProduct.execute(req.params.productId)

        return res.status(200).json(result)
    }

    async postProduct(req, res) {
        const { productName, pricePerUnit, units } = req.body

        if (!productName || !pricePerUnit || typeof units !== 'number')
            return res.status(301).json({ error: "Missing data" })

        Producer.sendMessage('product_created', { productName, pricePerUnit, units })

        return res.status(200).json(200)
    }

    async updateProduct(req, res) {
        const { productId, productName, pricePerUnit } = req.body

        if (!productId || !pricePerUnit || typeof pricePerUnit !== 'number')
            return res.status(301).json({ error: "Missing data" })

        Producer.sendMessage('product_updated', { productId, productName, pricePerUnit })

        return res.status(200).json(200)
    }

    async addUnit(req, res) {
        const { productId, units } = req.body

        if (!productId || typeof units !== 'number')
            return res.status(301).json({ error: "Missing data" })

        Producer.sendMessage('product_added', { productId, units })

        return res.status(200).json(200)
    }

    async removeUnit(req, res) {
        const { productId, units } = req.body

        if (!productId || typeof units !== 'number')
            return res.status(301).json({ error: "Missing data" })

        Producer.sendMessage('product_removed', { productId, units })

        return res.status(200).json(200)
    }

    async deleteProduct(req, res) {
        const { productId } = req.body

        if (!productId)
            return res.status(301).json({ error: 'Missing data' })

        Producer.sendMessage('product_deleted', { productId })

        return res.status(200).json(200)
    }
}

export default new Product()