import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class UpdateTaskService {
    constructor(private taskRespository: TaskRepository) {}

    async execute(uid: string, newTask: TaskDTO): Promise<TaskDTO> {
        const updatedTask = await this.taskRespository.updateOne(uid, newTask);

        return updatedTask;
    }
}
