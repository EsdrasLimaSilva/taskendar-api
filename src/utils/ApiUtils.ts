import { Request } from "express";

export class ApiUtils {
    static getUserIdFromRequest(req: Request): string {
        const uid = req.auth?.payload.sub;
        if (!uid) throw new Error("Unable to retrieve UserID from token");
        return uid;
    }
}
