import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connection.js";


class User extends Model { }
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    creationDate: { 
        type: DataTypes.DATE,
        allowNull: true,
    }, 
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'client'
        },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: false
  }
);

export default User;