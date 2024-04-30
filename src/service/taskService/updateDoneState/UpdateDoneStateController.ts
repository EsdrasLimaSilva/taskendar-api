import { Request, Response } from "express";
import { ApiUtils } from "../../../utils/ApiUtils";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { UpdateDoneStateService } from "./UpdateDoneStateService";

export class UpdateDoneStateController {
    constructor(private updateDoneStateService: UpdateDoneStateService) {}

    async handle(req: Request, res: Response) {
        try {
            const { taskId, done } = req.body as {
                taskId: string;
                done: boolean;
            };
            const uid = ApiUtils.getUserIdFromRequest(req);

            console.log(">>>>>>", taskId);

            await this.updateDoneStateService.execute(uid, taskId, done);

            return res
                .status(200)
                .json(new ResponseEntity(true, "Done state updated", {}));
        } catch (e) {
            const error = e as Error;
            return res.status(400).json(
                new ResponseEntity(false, "Unable to update task done state", {
                    error: error.message,
                }),
            );
        }
    }
}
