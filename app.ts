import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { checkJWT } from "./middlewares/checkJwt";
import { taskRouter } from "./routes/taskRoutes";
import { userRouter } from "./routes/userRoutes";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(checkJWT); // validates tokens

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

export { app };
