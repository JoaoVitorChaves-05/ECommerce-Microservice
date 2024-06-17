import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class GetOneProduct {
    async execute(productId) {
        try {
            const result = await ProductRepository.findById(productId)

            return result
        } catch (e) {
            console.error(e)
            return false
        }
    }
}

export default new GetOneProduct()