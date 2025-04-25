import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connection.js";


class RequestedProduct extends Model { }
RequestedProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clientBuyersId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
  },
  {
    sequelize,
    modelName: 'requestedProduct',
    tableName: 'requested_products',
    timestamps: false
  }
);

export default RequestedProduct;