import { Op, Sequelize } from "sequelize";
import { uuid } from "uuidv4";
import { CreateTaskDTO } from "../../../../dto/CreateTaskDTO";
import { TaskDTO } from "../../../../dto/TaskDTO";
import { TaskRepository } from "../../../TaskRepository";
import { SequelizeUserModel } from "../user/SequelizeUserModel";
import {
    SequelizeTaskModel,
    SequelizeTaskModelAttributes,
} from "./SequelizeTaskModel";

export class SequelizeTasksRepository implements TaskRepository {
    constructor(sequelize: Sequelize) {
        // setting up
        SequelizeTaskModel.init(SequelizeTaskModelAttributes, {
            sequelize,
            tableName: "task",
        });
        // defining the association
        SequelizeTaskModel.belongsTo(SequelizeUserModel, {
            foreignKey: {
                name: "uid",
            },
        });
    }

    async save(uid: string, task: CreateTaskDTO): Promise<TaskDTO> {
        await SequelizeTaskModel.sync();
        const newTask: TaskDTO = { ...task, _id: uuid(), uid };
        await SequelizeTaskModel.create({
            ...newTask,
            startsAt: new Date(task.startsAt),
            endsAt: new Date(task.endsAt),
        });

        return newTask;
    }

    async findOne(taskId: string): Promise<TaskDTO | null> {
        await SequelizeTaskModel.sync();
        const tsk = await SequelizeTaskModel.findByPk(taskId);

        return tsk
            ? new TaskDTO(
                  tsk.getDataValue("uid"),
                  tsk.getDataValue("title"),
                  tsk.getDataValue("description"),
                  tsk.getDataValue("startsAt").toISOString(),
                  tsk.getDataValue("endsAt").toISOString(),
                  tsk.getDataValue("_id"),
                  tsk.getDataValue("done"),
              )
            : null;
    }

    /**
     *
     * @param uid owner's userId
     * @param startDate startDate to search (must by in ISO string)
     * @param offset the page offset to retrieve
     * @param limit the num of register that should be returned
     * @returns
     */
    async findMany(
        uid: string,
        { year, month }: { month: number; year: number },
        offset: number = 0,
        limit: number = 15,
    ): Promise<TaskDTO[]> {
        await SequelizeTaskModel.sync();

        month -= 1; //jan must start at 0
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        monthStart.setHours(0);
        monthEnd.setHours(24);

        const tasks = await SequelizeTaskModel.findAll({
            where: { uid, startsAt: { [Op.between]: [monthStart, monthEnd] } },
            order: ["startsAt"],
            offset: offset * limit,
            limit: limit,
        });

        const tasksDTO = tasks.map(
            (tsk) =>
                new TaskDTO(
                    tsk.getDataValue("uid"),
                    tsk.getDataValue("title"),
                    tsk.getDataValue("description"),
                    tsk.getDataValue("startsAt").toISOString(),
                    tsk.getDataValue("endsAt").toISOString(),
                    tsk.getDataValue("_id"),
                    tsk.getDataValue("done"),
                ),
        );

        return [...tasksDTO];
    }

    async findManyByQuery(
        uid: string,
        query: string,
        offset?: number | undefined,
        limit?: number | undefined,
    ): Promise<TaskDTO[]> {
        await SequelizeTaskModel.sync();

        limit = limit || 20;
        offset = (offset || 0) * limit;

        const tasks = await SequelizeTaskModel.findAll({
            where: {
                uid,
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        const tasksDTO = tasks.map(
            (tsk) =>
                new TaskDTO(
                    tsk.getDataValue("uid"),
                    tsk.getDataValue("title"),
                    tsk.getDataValue("description"),
                    tsk.getDataValue("startsAt").toISOString(),
                    tsk.getDataValue("endsAt").toISOString(),
                    tsk.getDataValue("_id"),
                    tsk.getDataValue("done"),
                ),
        );

        return [...tasksDTO];
    }

    async updateOne(uid: string, task: TaskDTO): Promise<TaskDTO> {
        await SequelizeTaskModel.sync();

        const tsk = await SequelizeTaskModel.findByPk(task._id);
        if (!tsk) throw new Error("Task not found!");

        const ownerId = tsk.getDataValue("uid");
        if (uid !== ownerId)
            throw new Error("User not allowed to update the task!");

        const updatedTask = await tsk.update({
            ...task,
            uid,
            startsAt: new Date(task.startsAt),
            endsAt: new Date(task.endsAt),
        });

        return new TaskDTO(
            updatedTask.getDataValue("uid"),
            updatedTask.getDataValue("title"),
            updatedTask.getDataValue("description"),
            updatedTask.getDataValue("startsAt").toISOString(),
            updatedTask.getDataValue("endsAt").toISOString(),
            updatedTask.getDataValue("_id"),
            tsk.getDataValue("done"),
        );
    }

    async deleteOne(uid: string, taskId: string): Promise<void> {
        const tsk = await SequelizeTaskModel.findByPk(taskId);
        if (!tsk) throw new Error("Task not found!");

        const ownerId = await tsk.getDataValue("uid");
        if (uid !== ownerId)
            throw new Error("User not allowed to update the task!");

        await tsk.destroy();
    }
}
