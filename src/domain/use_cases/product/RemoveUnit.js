import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class RemoveUnit {
    async execute(productId, units) {
        try {
            await ProductRepository.removeUnit(productId, units)
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

export default new RemoveUnit()