import { taskRespoitory } from "../../../repository";
import { GetTasksController } from "./GetTasksController";
import { GetTasksService } from "./GetTasksService";

const getTasksService = new GetTasksService(taskRespoitory);
const getTasksController = new GetTasksController(getTasksService);

export { getTasksController };
