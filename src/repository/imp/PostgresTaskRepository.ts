import { uuid } from "uuidv4";
import { TaskDTO } from "../../dto/TaskDTO";
import { TaskModel } from "../../model/TaskModel";
import { TaskRepository } from "../TaskRepository";
import { Op } from "sequelize";
import { CreateTaskDTO } from "../../dto/CreateTaskDTO";

export class PostgresTaskRepository implements TaskRepository {
    async save(task: CreateTaskDTO): Promise<void> {
        await TaskModel.sync();
        const newTask: TaskDTO = { ...task, _id: uuid() };
        await TaskModel.create({
            ...newTask,
            startsAt: new Date(task.startsAt),
            endsAt: new Date(task.endsAt),
        });
    }

    async findOne(taskId: string): Promise<TaskDTO | null> {
        await TaskModel.sync();
        const tsk = await TaskModel.findByPk(taskId);

        return tsk
            ? new TaskDTO(
                  tsk.getDataValue("uid"),
                  tsk.getDataValue("title"),
                  tsk.getDataValue("descripton"),
                  tsk.getDataValue("startsAt"),
                  tsk.getDataValue("endsAt"),
                  tsk.getDataValue("_id"),
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
        startDate: string,
        offset: number = 0,
        limit: number = 15,
    ): Promise<TaskDTO[]> {
        await TaskModel.sync();
        const tasks = await TaskModel.findAll({
            where: { uid, startsAt: { [Op.gte]: new Date(startDate) } },
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
                    tsk.getDataValue("startsAt"),
                    tsk.getDataValue("endsAt"),
                    tsk.getDataValue("_id"),
                ),
        );

        return [...tasksDTO];
    }

    async updateOne(uid: string, task: TaskDTO): Promise<void> {
        TaskModel.sync();

        const tsk = await TaskModel.findByPk(task._id);
        if (!tsk) throw new Error("Task not found!");

        const ownerId = await tsk.getDataValue("uid");
        if (uid !== ownerId)
            throw new Error("User not allowed to update the task!");

        tsk.update({ ...task, uid });
    }
}
