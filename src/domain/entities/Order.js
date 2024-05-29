class Order {
    constructor(customerId, items, orderStatus) {
        this.customerId = customerId;
        this.items = items;
        this.orderStatus = orderStatus;
        this.totalPrice = 0;
    }

    addProduct(productId, quantity) {
        let i = null
        let find = this.items.find((item, index) => {
            if (item.productId === productId) {
                i = index
                return true
            }
        })

        if (find)
            return this.items[i].quantity += quantity;
        this.items.push({productId, quantity})
    }

    removeProduct(productId, quantity) {
        let i = null
        let find = this.items.find((item, index) => {
            if (item.productId === productId) {
                i = index
                return true
            }
        })

        if (find && find.quantity > quantity)
            return this.items[i].quantity -= quantity;
        this.items = this.items.filter(item => item.productId !== productId)
    }

    updateProduct(productId, quantity) {
        let i = null
        let find = this.items.find((item, index) => {
            if (item.productId === productId) {
                i = index
                return true
            }
        })

        if (find)
            return this.items[i].quantity = quantity
    }
}

class OrderItem {
    constructor(productId, pricePerUnit, quantity) {
        this.productId = productId
        this.pricePerUnit = pricePerUnit
        this.quantity = quantity
    }
}

class OrderStatus {
    constructor(orderStatus) {
        const status = {
            PENDING: 'pending',
            COMPLETED: 'completed',
            CANCELLED: 'cancelled'
        }
        
        this.orderStatus = status[orderStatus] ? status[orderStatus] : status['CANCELLED']
    }
}

export default { Order, OrderItem, OrderStatus };