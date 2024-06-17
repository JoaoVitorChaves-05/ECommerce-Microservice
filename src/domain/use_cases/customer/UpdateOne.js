import CustomerRepository from "../../../infraestructure/repositories/CustomerRepository.js"
import bcryptjs from "bcryptjs"

class UpdateOneCustomer {
    async execute(email, password, newData) {
        try {
            const user = await CustomerRepository.findByEmail(email)
            const match = bcryptjs.compareSync(password, user.passwordHash)

            if (!match)
                return false

            await CustomerRepository.update(
                user.customerId,
                newData.name ? newData.name : user.name,
                newData.email ? newData.email : user.email,
                newData.password ? newData.password : password
            )

            return true

        } catch (err) {
            console.error(err)

            return false
        }
    }
}

export default new UpdateOneCustomer()