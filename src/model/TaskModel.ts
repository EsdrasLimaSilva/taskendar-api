import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/sequelizeConfig";
import { UserModel } from "./UserModel";

class TaskModel extends Model {}

TaskModel.init(
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },

        uid: {
            type: DataTypes.STRING,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        startsAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        endsAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { sequelize, tableName: "task" },
);

// defining the association
TaskModel.belongsTo(UserModel, {
    foreignKey: {
        name: "uid",
    },
});

export { TaskModel };
