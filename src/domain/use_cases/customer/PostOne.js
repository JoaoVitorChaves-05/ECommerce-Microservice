import CustomerRepository from "../../../infraestructure/repositories/CustomerRepository.js"

class PostOneCustomer {
    async execute(name, email, password) {
        try {
            const emailExists = await CustomerRepository.findByEmail(email)

            if (emailExists)
                return false

            await CustomerRepository.save(name, email, password)

            return true
        } catch (err) {
            console.error(err)

            return false
        }
    }
}

export default new PostOneCustomer()