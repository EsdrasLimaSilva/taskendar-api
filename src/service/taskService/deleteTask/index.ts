import { tasksRespoitory } from "../../../repository";
import { DeleteTaskController } from "./DeleteTaskController";
import { DeleteTaskService } from "./DeleteTaskService";

const deleteTaskService = new DeleteTaskService(tasksRespoitory);
const deleteTaskController = new DeleteTaskController(deleteTaskService);

export { deleteTaskController };
