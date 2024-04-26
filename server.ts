import "dotenv/config";
import { app } from "./app";
import { UserModel } from "./src/model/UserModel";
import { TaskModel } from "./src/model/TaskModel";

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
