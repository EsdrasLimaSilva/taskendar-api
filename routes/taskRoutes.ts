import { Request, Response, Router } from "express";
import { body, header, validationResult } from "express-validator";
import { createTaskController } from "../src/service/taskService/createTask";
import { deleteTaskController } from "../src/service/taskService/deleteTask";
import { getTasksController } from "../src/service/taskService/getTasks";
import { searchTasksController } from "../src/service/taskService/searchTasks";
import { updateDoneStateController } from "../src/service/taskService/updateDoneState";
import { updateTaskController } from "../src/service/taskService/updateTask";
import { ResponseEntity } from "../src/utils/ResponseEntity";

const taskRouter = Router();

taskRouter.get(
    "/",
    header(["month", "year"])
        .notEmpty()
        .escape()
        .withMessage("headers must be informed"),
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

taskRouter.get("/search/:query", (req, res) => {
    return searchTasksController.handle(req, res);
});

taskRouter.post(
    "/",
    body(["title", "description", "startsAt", "endsAt", "done"])
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

taskRouter.put(
    "/",
    body(["_id", "title", "description", "startsAt", "endsAt", "done"])
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

taskRouter.patch(
    "/",
    body(["taskId", "done"])
        .notEmpty()
        .escape()
        .withMessage("Fields Cannot be empty"),
    (req: Request, res: Response) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return updateDoneStateController.handle(req, res);
        }

        return res.status(400).json(
            new ResponseEntity(false, "All fields must be fullfield", {
                errors: result.array(),
            }),
        );
    },
);

taskRouter.delete("/:taskId", (req, res) => {
    return deleteTaskController.handle(req, res);
});

export { taskRouter };
