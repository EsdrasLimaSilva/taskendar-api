import { CreateTaskDTO } from "../dto/CreateTaskDTO";
import { TaskDTO } from "../dto/TaskDTO";

export interface TaskRepository {
    save(uid: string, task: CreateTaskDTO): Promise<TaskDTO>;
    findOne(taskId: string): Promise<TaskDTO | null>;
    findMany(
        username: string,
        startDate: string,
        offset: number,
        limit: number,
    ): Promise<TaskDTO[]>;
    updateOne(uid: string, task: TaskDTO): Promise<TaskDTO>;
    deleteOne(uid: string, taskId: string): Promise<void>;
}
