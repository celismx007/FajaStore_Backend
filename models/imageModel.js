import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connection.js";


class Image extends Model { }
Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'image',
    tableName: 'images',
    timestamps: false
  }
);

export default Image;