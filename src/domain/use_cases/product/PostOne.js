import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class Post {
    constructor() {}
    async execute(productName, pricePerUnit, units) {
        try {
            const resultProduct = await ProductRepository.save(productName, pricePerUnit, units)

            return resultProduct
        } catch (err) {
            return { error: err }
        }
    }
}

export default new Post()