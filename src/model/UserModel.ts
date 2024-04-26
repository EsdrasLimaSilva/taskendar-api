import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelizeConfig";

class UserModel extends Model {}

UserModel.init(
    {
        _id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "user",
    },
);

export { UserModel };
