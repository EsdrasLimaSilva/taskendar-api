import { Request, Response } from "express";
import { GetUserDataService } from "./GetUserDataService";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { ApiUtils } from "../../../utils/ApiUtils";

export class GetUserDataController {
    constructor(private getUserDataService: GetUserDataService) {}

    async handle(req: Request, res: Response) {
        try {
            const uid = ApiUtils.getUserIdFromRequest(req);
            const user = await this.getUserDataService.execute(uid);

            return res
                .status(200)
                .json(
                    new ResponseEntity(true, "User found successfully", user),
                );
        } catch (e) {
            const error = e as Error;

            return res.status(400).json(
                new ResponseEntity(false, "Unable to retrieve user data", {
                    error: error.message,
                }),
            );
        }
    }
}
