import CustomerRepository from '../../../infraestructure/repositories/CustomerRepository.js'
import bcryptjs from 'bcryptjs'

class DeleteOneCustomer {
    async execute(email, password) {
        try {
            const user = await CustomerRepository.findByEmail(email)
            const match = bcryptjs.compareSync(password, user.passwordHash)

            if (!match)
                return false

            await CustomerRepository.destroy(user.userId)

            return true
        } catch (err) {
            console.error(err)

            return false
        }
    }
}

export default new DeleteOneCustomer()