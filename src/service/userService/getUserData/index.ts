import { userRepository } from "../../../repository";
import { GetUserDataController } from "./GetUserDataController";
import { GetUserDataService } from "./GetUserDataService";

const getUserDataService = new GetUserDataService(userRepository);
const getUserDataController = new GetUserDataController(getUserDataService);

export { getUserDataController };
