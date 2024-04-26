import express from "express";
import { taskRouter } from "./routes/taskRoutes";
import { userRouter } from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

export { app };
