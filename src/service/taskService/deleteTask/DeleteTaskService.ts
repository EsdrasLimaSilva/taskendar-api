import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class DeleteTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(uid: string, taskId: string) {
        await this.taskRepository.deleteOne(uid, taskId);
    }
}
