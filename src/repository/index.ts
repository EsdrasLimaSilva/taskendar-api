import { PostgresTaskRepository } from "./imp/PostgresTaskRepository";
import { PostgresUserRepository } from "./imp/PostgresUserRepository";

const tasksRespoitory = new PostgresTaskRepository();
const userRepository = new PostgresUserRepository();

export { tasksRespoitory, userRepository };
