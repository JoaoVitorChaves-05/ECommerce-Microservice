import CustomerModel from "./Customer.js";
import OrderModel from "./Order.js";

const models = {
    CustomerModel,
    OrderModel
}

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
})

export default models