import { TaskRepository } from "../../../repository/TaskRepository";

export class UpdateDoneStateService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(uid: string, taskId: string, done: boolean) {
        await this.taskRepository.changeOneDoneState(uid, taskId, done);
    }
}
