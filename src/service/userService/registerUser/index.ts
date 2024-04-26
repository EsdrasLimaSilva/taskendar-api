import { PostgresUserRepository } from "../../../repository/imp/PostgresUserRepository";
import { RegisterUserController } from "./RegisterUserController";
import { RegisterUserService } from "./RegisterUserService";

const userRepository = new PostgresUserRepository();
const registerUserSerivce = new RegisterUserService(userRepository);
const registerUserController = new RegisterUserController(registerUserSerivce);

export { registerUserController };
