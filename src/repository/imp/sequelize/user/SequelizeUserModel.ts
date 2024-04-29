import { DataTypes, Model, ModelAttributes } from "sequelize";
import { UserModel } from "../../../../model/UserModel";

class SequelizeUserModel extends Model<UserModel> {}

const SequelizeUserModelAttributes: ModelAttributes<SequelizeUserModel> = {
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
};

export { SequelizeUserModel, SequelizeUserModelAttributes };
