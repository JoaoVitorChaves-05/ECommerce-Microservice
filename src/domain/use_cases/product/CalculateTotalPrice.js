import ProductRepository from "../../../infraestructure/repositories/ProductRepository.js"

class CalculateTotalPrice {
    async execute(orderItems) {
        let sum = 0

        try {
            for (let item of orderItems) {
                //const {pricePerUnit} = await ProductRepository.findById(item.productId)
                sum += item.pricePerUnit * item.quantity
            }
    
            return sum
        } catch (e) {
            return null
        }
        
    }
}

export default new CalculateTotalPrice()