import { taskRespoitory } from "../../../repository";
import { DeleteTaskController } from "./DeleteTaskController";
import { DeleteTaskService } from "./DeleteTaskService";

const deleteTaskService = new DeleteTaskService(taskRespoitory);
const deleteTaskController = new DeleteTaskController(deleteTaskService);

export { deleteTaskController };
