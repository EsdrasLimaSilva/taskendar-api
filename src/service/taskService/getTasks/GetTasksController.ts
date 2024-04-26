import { Request, Response } from "express";
import { GetTasksService } from "./GetTasksService";
import { ResponseEntity } from "../../../utils/ResponseEntity";

export class GetTasksController {
    constructor(private getTasksService: GetTasksService) {}

    async handle(req: Request, res: Response) {
        try {
            // unpacking variables
            const { startDate } = req.body as { startDate: string };
            const { page, limit } = req.query;
            const uid = req.params.uid;

            const tasks = await this.getTasksService.execute(
                uid,
                startDate,
                page ? Number(page) : undefined,
                limit ? Number(limit) : undefined,
            );

            res.status(200).json(
                new ResponseEntity(true, "OK", { page, limit, data: tasks }),
            );
        } catch (e) {
            const error = e as Error;

            return res.status(400).json(
                new ResponseEntity(false, "Unable to get tasks", {
                    error: error.message,
                }),
            );
        }
    }
}
