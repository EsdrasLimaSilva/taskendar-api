import { taskRespoitory } from "../../../repository";
import { CreateTaskController } from "./CreateTaskController";
import { CreateTaskService } from "./CreateTaskService";

const createTaskService = new CreateTaskService(taskRespoitory);
const createTaskController = new CreateTaskController(createTaskService);

export { createTaskController };
