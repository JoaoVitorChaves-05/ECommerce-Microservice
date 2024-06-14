import bcryptjs from 'bcryptjs'

class Customer {
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.passwordHash = bcryptjs.hashSync(password, 8)
    }
}

export { Customer }