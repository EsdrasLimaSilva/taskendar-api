import { taskRespoitory } from "../../../repository";
import { UpdateTaskController } from "./UpdateTaskController";
import { UpdateTaskService } from "./UpdateTaskService";

const updateTaskService = new UpdateTaskService(taskRespoitory);
const updateTaskController = new UpdateTaskController(updateTaskService);

export { updateTaskController };
