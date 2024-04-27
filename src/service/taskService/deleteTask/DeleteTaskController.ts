import { Request, Response } from "express";
import { DeleteTaskService } from "./DeleteTaskService";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { TaskDTO } from "../../../dto/TaskDTO";
import { ApiUtils } from "../../../utils/ApiUtils";

export class DeleteTaskController {
    constructor(private deleteTaskService: DeleteTaskService) {}

    async handle(req: Request, res: Response) {
        try {
            const { taskId } = req.params as { taskId: string };
            const uid = ApiUtils.getUserIdFromRequest(req);

            await this.deleteTaskService.execute(uid, taskId);

            return res
                .status(200)
                .json(new ResponseEntity(true, "Task delete successfully", {}));
        } catch (e) {
            const error = e as Error;

            return res.status(400).json(
                new ResponseEntity(false, "Unable to delete task", {
                    error: error.message,
                }),
            );
        }
    }
}
