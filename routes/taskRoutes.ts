import { Request, Response, Router } from "express";
import { createTaskController } from "../src/service/taskService/createTask";
import { body, validationResult } from "express-validator";
import { ResponseEntity } from "../src/utils/ResponseEntity";

const taskRouter = Router();

taskRouter.post(
    "/",
    body(["uid", "title", "description", "startsAt", "endsAt"])
        .notEmpty()
        .escape()
        .withMessage("Fields Cannot be empty"),
    (req: Request, res: Response) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return createTaskController.handle(req, res);
        }

        return res.status(400).json(
            new ResponseEntity(false, "All fields must be fullfield", {
                errors: result.array(),
            }),
        );
    },
);

export { taskRouter };
