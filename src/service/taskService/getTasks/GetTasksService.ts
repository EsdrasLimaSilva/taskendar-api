import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class GetTasksService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(
        username: string,
        { year, month }: { month: number; year: number },
        page: number = 1,
        limit: number = 15,
    ): Promise<TaskDTO[]> {
        if (page <= 0) throw new Error("Page must be at least '1'");

        const tasks = await this.taskRepository.findMany(
            username,
            { month, year },
            page - 1,
            limit,
        );
        return [...tasks];
    }
}
