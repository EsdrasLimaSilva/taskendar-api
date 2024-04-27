import { Request, Response, Router, query } from "express";
import { createTaskController } from "../src/service/taskService/createTask";
import { body, header, validationResult } from "express-validator";
import { ResponseEntity } from "../src/utils/ResponseEntity";
import { getTasksController } from "../src/service/taskService/getTasks";
import { updateTaskController } from "../src/service/taskService/updateTask";
import { deleteTaskController } from "../src/service/taskService/deleteTask";

const taskRouter = Router();

taskRouter.post(
    "/",
    body(["title", "description", "startsAt", "endsAt"])
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

//TODO: uid should be get by the auth token not in the url
taskRouter.get(
    "/",
    header(["startDate"])
        .notEmpty()
        .escape()
        .withMessage("startDate must be informed"),
    (req: Request, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) return getTasksController.handle(req, res);

        return res.status(400).json(
            new ResponseEntity(false, "Invalid header", {
                error: result.array(),
            }),
        );
    },
);

taskRouter.put(
    "/",
    body(["_id", "uid", "title", "description", "startsAt", "endsAt"])
        .notEmpty()
        .escape()
        .withMessage("Fields Cannot be empty"),
    (req: Request, res: Response) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return updateTaskController.handle(req, res);
        }

        return res.status(400).json(
            new ResponseEntity(false, "All fields must be fullfield", {
                errors: result.array(),
            }),
        );
    },
);

taskRouter.delete(
    "/",
    body(["taskId"])
        .notEmpty()
        .escape()
        .withMessage("Field should not be empty"),
    (req: Request, res: Response) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return deleteTaskController.handle(req, res);
        }

        return res.status(400).json(
            new ResponseEntity(false, "All fields must be fullfield", {
                errors: result.array(),
            }),
        );
    },
);

export { taskRouter };
