import express from "express";
import { taskRouter } from "./routes/taskRoutes";
import { userRouter } from "./routes/userRoutes";
import cors from "cors";
import { checkJWT } from "./middlewares/checkJwt";

const app = express();
app.use(express.json());
app.use(cors());
app.use(checkJWT); // validates tokens

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

export { app };
