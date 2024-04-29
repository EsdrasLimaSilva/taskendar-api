import { configureSequelize } from "../config/sequelizeConfig";
import { SequelizeTasksRepository } from "./imp/sequelize/task/SequelizeTaskRepository";
import { SequelizeUserRepository } from "./imp/sequelize/user/SequelizeUserRepository";

const sequelize = configureSequelize(`${process.env.POSTGRES_URI}`);
// MUST be before tasks repository due to association created in tasksRepository
const userRepository = new SequelizeUserRepository(sequelize);
const taskRespoitory = new SequelizeTasksRepository(sequelize);

export { taskRespoitory, userRepository };
