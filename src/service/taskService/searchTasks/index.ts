import { tasksRespoitory } from "../../../repository";
import { SearchTasksController } from "./SearchTasksController";
import { SearchTaskService } from "./SearchTasksService";

const searchTasksSerivce = new SearchTaskService(tasksRespoitory);
const searchTasksController = new SearchTasksController(searchTasksSerivce);

export { searchTasksController };
