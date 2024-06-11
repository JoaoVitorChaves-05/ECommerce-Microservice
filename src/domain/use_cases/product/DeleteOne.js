import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class DeleteOne {
    constructor() {}
    async execute(productId) {
        try {
            await ProductRepository.destroy(productId)

            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

export default new DeleteOne()