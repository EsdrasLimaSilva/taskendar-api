import { uuid } from "uuidv4";
import { TaskDTO } from "../../dto/TaskDTO";
import { TaskModel } from "../../model/TaskModel";
import { TaskRepository } from "../TaskRepository";
import { Op } from "sequelize";
import { CreateTaskDTO } from "../../dto/CreateTaskDTO";

export class PostgresTaskRepository implements TaskRepository {
    async save(uid: string, task: CreateTaskDTO): Promise<TaskDTO> {
        await TaskModel.sync();
        const newTask: TaskDTO = { ...task, _id: uuid(), uid };
        await TaskModel.create({
            ...newTask,
            startsAt: new Date(task.startsAt),
            endsAt: new Date(task.endsAt),
        });

        return newTask;
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
        { year, month }: { month: number; year: number },
        offset: number = 0,
        limit: number = 15,
    ): Promise<TaskDTO[]> {
        await TaskModel.sync();

        month -= 1; //jan must start at 0
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        monthStart.setHours(0);
        monthEnd.setHours(24);

        console.log(monthStart);
        console.log(monthEnd);

        const tasks = await TaskModel.findAll({
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
                    tsk.getDataValue("startsAt"),
                    tsk.getDataValue("endsAt"),
                    tsk.getDataValue("_id"),
                ),
        );

        return [...tasksDTO];
    }

    async updateOne(uid: string, task: TaskDTO): Promise<TaskDTO> {
        TaskModel.sync();

        const tsk = await TaskModel.findByPk(task._id);
        if (!tsk) throw new Error("Task not found!");

        const ownerId = await tsk.getDataValue("uid");
        if (uid !== ownerId)
            throw new Error("User not allowed to update the task!");

        const updatedTask = await tsk.update({ ...task, uid });

        return new TaskDTO(
            updatedTask.getDataValue("uid"),
            updatedTask.getDataValue("title"),
            updatedTask.getDataValue("description"),
            updatedTask.getDataValue("startsAt"),
            updatedTask.getDataValue("endsAt"),
            updatedTask.getDataValue("_id"),
        );
    }

    async deleteOne(uid: string, taskId: string): Promise<void> {
        const tsk = await TaskModel.findByPk(taskId);
        if (!tsk) throw new Error("Task not found!");

        const ownerId = await tsk.getDataValue("uid");
        if (uid !== ownerId)
            throw new Error("User not allowed to update the task!");

        await tsk.destroy();
    }
}
