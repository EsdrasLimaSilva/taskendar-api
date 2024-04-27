import { Request, Response } from "express";
import { GetTasksService } from "./GetTasksService";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { ApiUtils } from "../../../utils/ApiUtils";

export class GetTasksController {
    constructor(private getTasksService: GetTasksService) {}

    async handle(req: Request, res: Response) {
        try {
            // unpacking variables
            const month = req.headers["month"];
            const year = req.headers["year"];

            const { page, limit } = req.query;

            //retrieveing user id
            const uid = ApiUtils.getUserIdFromRequest(req);

            const tasks = await this.getTasksService.execute(
                uid,
                {
                    month: Number(month),
                    year: Number(year),
                },
                page ? Number(page) : undefined,
                limit ? Number(limit) : undefined,
            );

            res.status(200).json(
                new ResponseEntity(true, "OK", { page, limit, tasks: tasks }),
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
