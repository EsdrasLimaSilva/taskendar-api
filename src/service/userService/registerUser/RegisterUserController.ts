import { Request, Response } from "express";
import { RegisterUserService } from "./RegisterUserService";
import { ResponseEntity } from "../../../utils/ResponseEntity";
import { UserDTO } from "../../../dto/UserDTO";

export class RegisterUserController {
    constructor(private registerUserService: RegisterUserService) {}

    async handle(req: Request, res: Response) {
        try {
            const user = req.body as UserDTO;
            await this.registerUserService.execute(user);

            return res
                .status(201)
                .json(
                    new ResponseEntity(
                        false,
                        "User registered successfully!",
                        {},
                    ),
                );
        } catch (e) {
            const error = e as Error;
            return res.status(400).json(
                new ResponseEntity(false, "Unable to Register user", {
                    error: error.message,
                }),
            );
        }
    }
}
