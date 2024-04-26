import { userRepository } from "../../../repository";
import { RegisterUserController } from "./RegisterUserController";
import { RegisterUserService } from "./RegisterUserService";

const registerUserSerivce = new RegisterUserService(userRepository);
const registerUserController = new RegisterUserController(registerUserSerivce);

export { registerUserController };
