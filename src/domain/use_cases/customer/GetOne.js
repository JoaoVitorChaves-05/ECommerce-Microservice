import CustomerRepository from "../../../infraestructure/repositories/CustomerRepository.js"

class GetOneCustomer {
    async execute(customerId) {
        try {
            const user = await CustomerRepository.findById(customerId)
            return user
        } catch (err) {
            console.error(err)

            return false
        }
    }
}

export default new GetOneCustomer()