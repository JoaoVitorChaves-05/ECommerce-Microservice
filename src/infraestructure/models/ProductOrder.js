import { Model, DataTypes} from 'sequelize'
import database from '../database.js'

class ProductOrder extends Model {}

ProductOrder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize: database.connection,
        tableName: 'ProductOrder'
    }
)

export default ProductOrder