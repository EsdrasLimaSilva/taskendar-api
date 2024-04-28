import { TaskDTO } from "../../../dto/TaskDTO";
import { TaskRepository } from "../../../repository/TaskRepository";

export class SearchTaskService {
    constructor(private taskRepositody: TaskRepository) {}

    async execute(uid: string, query: string): Promise<TaskDTO[]> {
        const tasks = await this.taskRepositody.findManyByQuery(uid, query);
        return [...tasks];
    }
}
