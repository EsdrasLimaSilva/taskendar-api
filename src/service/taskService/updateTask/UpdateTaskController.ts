import { Request, Response } from "express";
import { UpdateTaskService } from "./UpdateTaskService";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { TaskDTO } from "../../../dto/TaskDTO";
import { ApiUtils } from "../../../utils/ApiUtils";

export class UpdateTaskController {
    constructor(private updateTaskService: UpdateTaskService) {}

    async handle(req: Request, res: Response) {
        try {
            const updatedTask = req.body as TaskDTO;

            // getting user id
            const uid = ApiUtils.getUserIdFromRequest(req);

            await this.updateTaskService.execute(uid, updatedTask);

            return res
                .status(200)
                .json(new ResponseEntity(true, "Task updated", {}));
        } catch (e) {
            const error = e as Error;

            return res.status(400).json(
                new ResponseEntity(false, "Unable to Update task", {
                    error: error.message,
                }),
            );
        }
    }
}
