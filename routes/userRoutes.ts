import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { registerUserController } from "../src/service/userService/registerUser";
import { ResponseEntity } from "../src/utils/ResponseEntity";

const userRouter = Router();

userRouter.post(
    "/",
    body(["username"])
        .notEmpty()
        .escape()
        .withMessage("Fields Cannot be empty"),
    (req: Request, res: Response) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return registerUserController.handle(req, res);
        }

        return res.status(400).json(
            new ResponseEntity(false, "All fields must be fullfield", {
                errors: result.array(),
            }),
        );
    },
);

export { userRouter };
