import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connection.js";


class ClientBuyer extends Model { }
ClientBuyer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'clientBuyer',
    tableName: 'client_buyers',
    timestamps: false
  }
);

export default ClientBuyer;