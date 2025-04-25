import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connection.js";


class Product extends Model { }
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'vacio',
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'vacio',
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'vacio',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'vacio',
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'vacio',
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'vacio',
    },
  },
  {
    sequelize,
    modelName: 'product',
    tableName: 'products',
    timestamps: false
  }
);

export default Product;