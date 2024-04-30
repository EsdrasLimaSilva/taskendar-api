import { Request, Response } from "express";
import { CreateTaskDTO } from "../../../dto/CreateTaskDTO";
import { ApiUtils } from "../../../utils/ApiUtils";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { CreateTaskService } from "./CreateTaskService";

export class CreateTaskController {
    constructor(private createTaskService: CreateTaskService) {}

    async handle(req: Request, res: Response) {
        try {
            const task = req.body as CreateTaskDTO;
            const uid = ApiUtils.getUserIdFromRequest(req);
            const createdTask = await this.createTaskService.execute(uid, task);

            return res.status(201).json(
                new ResponseEntity(true, "Task created successfully!", {
                    task: createdTask,
                }),
            );
        } catch (e) {
            const error = e as Error;

            return res.status(400).json(
                new ResponseEntity(false, "Unable to create task", {
                    error: error.message,
                }),
            );
        }
    }
}
