import { Model, DataTypes } from 'sequelize'
import database from '../database.js'

class OrderModel extends Model {}

OrderModel.init(
    {
        orderId: {
            type: DataTypes.Integer,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize: database.connection,
        tableName: 'Order',
    }
)

export default OrderModel