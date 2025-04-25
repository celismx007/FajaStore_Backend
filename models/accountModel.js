import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import User from "./userModel.js";


class Account extends Model { }
Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'account',
        tableName: 'accounts',
        timestamps: false
    }
);

export default Account;
