import { Request, Response } from "express";
import { CreateTaskService } from "./CreateTaskService";
import { TaskDTO } from "../../../dto/TaskDTO";
import { ResponseEntity } from "../../../utils/ResponseEntity";

export class CreateTaskController {
    constructor(private createTaskService: CreateTaskService) {}

    async handle(req: Request, res: Response) {
        try {
            const task = req.body as TaskDTO;
            await this.createTaskService.execute(task);

            return res
                .status(201)
                .json(
                    new ResponseEntity(false, "Task created successfully!", {}),
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
