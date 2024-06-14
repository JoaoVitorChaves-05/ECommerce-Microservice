import CustomerRepository from "../../../infraestructure/repositories/CustomerRepository.js"

class GetAllCustomers {
    async execute() {
        try {
            const users = await CustomerRepository.findAll()
            users.forEach(user => user.passwordHash = null)

            return users
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

export default new GetAllCustomers()