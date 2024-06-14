import { Customer } from '../../domain/entities/Customer.js'
import CustomerModel from '../models/Customer.js'

class CustomerRepository {
    async save(name, email, password) {
        await CustomerModel.create(new Customer(name, email, password))
    }

    async findById(customerId) {
        const customerRecord = await CustomerModel.findByPk(customerId)
        if (!customerRecord)
            return null

        return customerRecord
    }

    async findByEmail(email) {
        const customerRecord = await CustomerModel.findOne({
            where: { email: email} 
        }).then(el => el.toJSON())

        if (!customerRecord)
            return null

        return customerRecord
    }

    async findAll() {
        const customerRecords = await CustomerModel.findAll()
        .then(res => res.map(el => el.toJSON()))
        return customerRecords
    }

    async update(customerId, name, email, password) {
        await CustomerModel.update(new Customer(name, email, password), {
            where: { customerId: customerId }
        })
    }

    async delete(customerId) {
        await CustomerModel.destroy({
            where: { customerId: customerId }
        })
    }
}

export default new CustomerRepository()