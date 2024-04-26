import { PostgresTaskRepository } from "../../../repository/imp/PostgresTaskRepository";
import { CreateTaskController } from "./CreateTaskController";
import { CreateTaskService } from "./CreateTaskService";

const taskRepository = new PostgresTaskRepository();
const createTaskService = new CreateTaskService(taskRepository);
const createTaskController = new CreateTaskController(createTaskService);

export { createTaskController };
