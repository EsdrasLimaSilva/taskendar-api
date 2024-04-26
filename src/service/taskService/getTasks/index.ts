import { tasksRespoitory } from "../../../repository";
import { GetTasksController } from "./GetTasksController";
import { GetTasksService } from "./GetTasksService";

const getTasksService = new GetTasksService(tasksRespoitory);
const getTasksController = new GetTasksController(getTasksService);

export { getTasksController };
