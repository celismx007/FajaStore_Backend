import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Product from "./productModel.js";


class UnitsProduct extends Model {}

UnitsProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "vacio",
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "vacio",
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "unitsProduct",
    tableName: "units_product",
    timestamps: false,
  }
);

export default UnitsProduct;

