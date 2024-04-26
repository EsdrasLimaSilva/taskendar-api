import { tasksRespoitory } from "../../../repository";
import { UpdateTaskController } from "./UpdateTaskController";
import { UpdateTaskService } from "./UpdateTaskService";

const updateTaskService = new UpdateTaskService(tasksRespoitory);
const updateTaskController = new UpdateTaskController(updateTaskService);

export { updateTaskController };
