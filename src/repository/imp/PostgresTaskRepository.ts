import { uuid } from "uuidv4";
import { TaskDTO } from "../../dto/TaskDTO";
import { TaskModel } from "../../model/TaskModel";
import { TaskRepository } from "../TaskRepository";

export class PostgresTaskRepository implements TaskRepository {
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
    async save(task: TaskDTO): Promise<void> {
        await TaskModel.sync();
        task._id = uuid();
        await TaskModel.create({
            ...task,
            startsAt: new Date(task.startsAt),
            endsAt: new Date(task.endsAt),
        });
    }

    async findMany(
        uid: string,
        offset: number = 0,
        limit: number = 15,
    ): Promise<TaskDTO[]> {
        await TaskModel.sync();
        const tasks = await TaskModel.findAll({
            where: { uid },
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
}
