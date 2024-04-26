import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class UpdateTaskService {
    constructor(private taskRespository: TaskRepository) {}

    async execute(uid: string, updatedTask: TaskDTO) {
        await this.taskRespository.updateOne(uid, updatedTask);
    }
}
