import { Model, DataTypes } from 'sequelize'
import database from '../database.js'

class ProductModel extends Model {}

ProductModel.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pricePerUnit: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        units: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize: database.connection,
        tableName: 'Product'
    }
)

export default ProductModel