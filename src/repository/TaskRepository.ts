import { CreateTaskDTO } from "../dto/CreateTaskDTO";
import { TaskDTO } from "../dto/TaskDTO";

export interface TaskRepository {
    save(uid: string, task: CreateTaskDTO): Promise<TaskDTO>;
    findOne(taskId: string): Promise<TaskDTO | null>;
    findMany(
        uid: string,
        { year, month }: { month: number; year: number },
        offset: number,
        limit: number,
    ): Promise<TaskDTO[]>;
    findManyByQuery(
        uid: string,
        query: string,
        offset?: number,
        limit?: number,
    ): Promise<TaskDTO[]>;
    updateOne(uid: string, task: TaskDTO): Promise<TaskDTO>;
    changeOneDoneState(
        uid: string,
        taskId: string,
        done: boolean,
    ): Promise<void>;
    deleteOne(uid: string, taskId: string): Promise<void>;
}
