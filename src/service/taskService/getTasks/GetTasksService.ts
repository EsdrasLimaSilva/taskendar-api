import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class GetTasksService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(
        username: string,
        startDate: string,
        page: number = 1,
        limit: number = 15,
    ): Promise<TaskDTO[]> {
        if (page <= 0) throw new Error("Page must be at least '1'");

        const tasks = await this.taskRepository.findMany(
            username,
            startDate,
            page - 1,
            limit,
        );
        return [...tasks];
    }
}
