import { TaskDTO } from "../dto/TaskDTO";

export interface TaskRepository {
    save(task: TaskDTO): Promise<void>;
    findOne(taskId: string): Promise<TaskDTO | null>;
    findMany(
        username: string,
        offset: number,
        limit: number,
    ): Promise<TaskDTO[]>;
}
