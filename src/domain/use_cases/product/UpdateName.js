import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class UpdateName {
    async execute(productId, newProductName) {
        try {
            await ProductRepository.updateName(productId, newProductName)
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

export default new UpdateName()