import { Request, Response } from "express";
import { ApiUtils } from "../../../utils/ApiUtils";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { SearchTaskService } from "./SearchTasksService";

export class SearchTasksController {
    constructor(private searchTasksService: SearchTaskService) {}

    async handle(req: Request, res: Response) {
        try {
            const { query } = req.params;
            const uid = ApiUtils.getUserIdFromRequest(req);

            const tasks = await this.searchTasksService.execute(uid, query);

            return res
                .status(200)
                .json(new ResponseEntity(true, "Tasks found", { tasks }));
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
