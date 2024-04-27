import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class CreateTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(
        uid: string,
        task: Omit<TaskDTO, "_id"> & { _id?: string },
    ): Promise<TaskDTO> {
        // checking if task already exists
        if (task._id && (await this.taskRepository.findOne(task._id))) {
            throw new Error("Task already exists!");
        }

        const createdTask = await this.taskRepository.save(uid, task);
        return createdTask;
    }
}
