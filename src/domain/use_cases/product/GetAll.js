import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class GetAllProducts {
    async execute() {
        try {
            const result = await ProductRepository.findAll()

            return result
        } catch (e) {
            console.error(e)
            return false
        }
    }
}

export default new GetAllProducts()