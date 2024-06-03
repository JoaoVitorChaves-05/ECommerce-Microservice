import Product from '../../domain/entities/Product.js'
import ProductModel from '../models/Product.js'

class ProductRepository {
    async save(productName, pricePerUnit, units) {
        await ProductModel.create(new Product(productName, pricePerUnit, units))
    }

    async findById(productId) {
        const productRecord = await ProductModel.findById(productId)
        if (!productRecord) return null

        return new Product(
            productRecord.productName,
            productRecord.pricePerUnit,
            productRecord.units
        )
    }

    async findAll() {
        const productOrders = await ProductModel.findAll()
        .then(res => res.map(el => el.toJSON()))
        return productOrders.map(productOrder => new Product(productOrder.productName, productOrder.pricePerUnit, productOrder.units))
    }

    async updateName(productId, newProductName) {
        await ProductModel.update({
            productName: newProductName
        }, {
            where: {
                productId: productId
            }
        })
    }

    async addUnit(productId, units) {
        const product = await ProductModel.findById(productId)

        await Product.update({
            units: product.units + units
        }, {
            where: {
                productId: productId
            }
        })
    }

    async removeUnit(productId, units) {
        const product = await ProductModel.findById(productId)

        if (product.units >= units) {
            await Product.update({
                units: product.units + units
            }, {
                where: {
                    productId: productId
                }
            })
        }

    }
}

export default new ProductRepository()