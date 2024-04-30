import { DataTypes, Model, ModelAttributes } from "sequelize";
import { TaskModel } from "../../../../model/TaskModel";

class SequelizeTaskModel extends Model<TaskModel> {}

const SequelizeTaskModelAttributes: ModelAttributes<SequelizeTaskModel> = {
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

    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
};

export { SequelizeTaskModel, SequelizeTaskModelAttributes };
