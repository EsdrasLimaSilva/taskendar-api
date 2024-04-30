import { CreateTaskDTO } from "../../../dto/CreateTaskDTO";
import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class CreateTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(uid: string, task: CreateTaskDTO): Promise<TaskDTO> {
        const createdTask = await this.taskRepository.save(uid, task);

        return createdTask;
    }
}
