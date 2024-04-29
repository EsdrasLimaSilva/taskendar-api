import { taskRespoitory } from "../../../repository";
import { SearchTasksController } from "./SearchTasksController";
import { SearchTaskService } from "./SearchTasksService";

const searchTasksSerivce = new SearchTaskService(taskRespoitory);
const searchTasksController = new SearchTasksController(searchTasksSerivce);

export { searchTasksController };
