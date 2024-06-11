import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class AddUnit {
    async execute(productId, units) {
        try {
            await ProductRepository.addUnit(productId, units)
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

export default new AddUnit()