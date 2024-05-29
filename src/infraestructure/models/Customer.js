import { Model, DataTypes } from 'sequelize';
import database from '../database.js';

class CustomerModel extends Model {}

CustomerModel.init(
    {
        customerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: database.connection,
        tableName: 'Customer'
    }
)

export default CustomerModel;