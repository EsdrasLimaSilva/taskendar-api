import { taskRespoitory } from "../../../repository";
import { UpdateDoneStateController } from "./UpdateDoneStateController";
import { UpdateDoneStateService } from "./UpdateDoneStateService";

const updateDoneStateService = new UpdateDoneStateService(taskRespoitory);
const updateDoneStateController = new UpdateDoneStateController(
    updateDoneStateService,
);

export { updateDoneStateController };
