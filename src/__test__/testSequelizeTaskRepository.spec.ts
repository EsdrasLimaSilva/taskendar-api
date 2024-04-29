import {
    PostgreSqlContainer,
    StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { configureSequelize } from "../config/sequelizeConfig";
import { TaskDTO } from "../dto/TaskDTO";
import { SequelizeTaskModel } from "../repository/imp/sequelize/task/SequelizeTaskModel";
import { SequelizeTasksRepository } from "../repository/imp/sequelize/task/SequelizeTaskRepository";
import {
    SequelizeUserModel,
    SequelizeUserModelAttributes,
} from "../repository/imp/sequelize/user/SequelizeUserModel";

describe("Sequelize Task Repository", () => {
    jest.setTimeout(60000);

    const dummyUser = {
        _id: "123",
        username: "Dummy User",
    };

    let sequelizeTaskRepository: SequelizeTasksRepository;
    let pgContainer: StartedPostgreSqlContainer;
    let sequelize;

    beforeAll(async () => {
        pgContainer = await new PostgreSqlContainer("postgres:15")
            .withUsername("postgres")
            .withPassword("postgres")
            .start();

        sequelize = configureSequelize(pgContainer.getConnectionUri());

        // initialing User Table
        SequelizeUserModel.init(SequelizeUserModelAttributes, {
            sequelize,
            tableName: "user",
        });

        await SequelizeUserModel.sync();
        await SequelizeUserModel.create({ ...dummyUser });

        sequelizeTaskRepository = new SequelizeTasksRepository(sequelize);
    });

    beforeEach(async () => {
        // cleaning task table
        await SequelizeTaskModel.sync();
        await SequelizeTaskModel.truncate();
    });

    afterAll(async () => {
        await pgContainer.stop();
    });

    it("Should CREATE a task sucessfully", async () => {
        const task = await sequelizeTaskRepository.save(dummyUser._id, {
            title: "New Task",
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
        });

        expect(task.title).toBe("New Task");
    });

    it("Should UPDATE a task sucessfully", async () => {
        // inserting a new task
        const oldTask = await sequelizeTaskRepository.save(dummyUser._id, {
            title: "Old Task Title",
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
        });

        // creating the new task (with same id as the older one)
        const newTaskTitle = "New Title";
        const newTask: TaskDTO = {
            _id: oldTask._id,
            title: newTaskTitle,
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
            uid: dummyUser._id,
        };

        const updatedTask = await sequelizeTaskRepository.updateOne(
            dummyUser._id,
            { ...newTask },
        );

        expect(updatedTask._id).toBe(oldTask._id);
        expect(updatedTask.title).toBe(newTaskTitle);
    });

    it("should throw an error when trying to update a non existing task", async () => {
        // inserting a new task
        const oldTask = await sequelizeTaskRepository.save(dummyUser._id, {
            title: "Old Task Title",
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
        });

        // creating the new task (with same id as the older one)
        const newTaskTitle = "New Title";
        const newTask: TaskDTO = {
            _id: oldTask._id,
            title: newTaskTitle,
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
            uid: dummyUser._id,
        };

        expect(
            async () =>
                await sequelizeTaskRepository.updateOne(dummyUser._id, {
                    ...newTask,
                    _id: "this-id-does-not-exists",
                }),
        ).rejects.toThrow();
    });

    it("Should throw an error when trying to UPDATE a task that the user does not possess", async () => {
        // inserting a new task
        const oldTask = await sequelizeTaskRepository.save(dummyUser._id, {
            title: "Old Task Title",
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
        });

        // creating the new task (with same id as the older one)
        const newTaskTitle = "New Title";
        const newTask: TaskDTO = {
            _id: oldTask._id,
            title: newTaskTitle,
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
            uid: dummyUser._id,
        };

        expect(
            async () =>
                await sequelizeTaskRepository.updateOne(
                    "this-id-does-no-exists",
                    {
                        ...newTask,
                    },
                ),
        ).rejects.toThrow();
    });

    it("should DELETE a task successfully", async () => {
        // inserting a new task
        const task = await sequelizeTaskRepository.save(dummyUser._id, {
            title: "Old Task Title",
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
        });

        // removing the task
        await sequelizeTaskRepository.deleteOne(dummyUser._id, task._id);

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const allTasks = await sequelizeTaskRepository.findMany(dummyUser._id, {
            year,
            month,
        });

        expect(allTasks).toHaveLength(0);
    });

    it("Should throw an error when trying to DELETE a task that does not exists", async () => {
        // inserting a new task
        const task = await sequelizeTaskRepository.save(dummyUser._id, {
            title: "Old Task Title",
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
        });

        // trying to remove the task
        expect(
            async () =>
                await sequelizeTaskRepository.deleteOne(
                    dummyUser._id,
                    "this-id-does-not-exists",
                ),
        ).rejects.toThrow();
    });

    it("Should GET only the target tasks", async () => {
        const targetTaskDate = new Date();
        const targetYear = targetTaskDate.getFullYear();
        const targetMonth = targetTaskDate.getMonth() + 1; // we want the month not the index of the month

        const ignDate = new Date(targetYear, targetMonth === 1 ? 2 : 1);

        // inserting target task
        await sequelizeTaskRepository.save(dummyUser._id, {
            title: "Target Task",
            description: "Target Task Description",
            endsAt: targetTaskDate.toISOString(),
            startsAt: targetTaskDate.toISOString(),
        });

        // inserting ignored task
        await sequelizeTaskRepository.save(dummyUser._id, {
            title: "Ignored Task",
            description: "Ignored Task Description",
            endsAt: ignDate.toISOString(),
            startsAt: ignDate.toISOString(),
        });

        const tasks = await sequelizeTaskRepository.findMany(dummyUser._id, {
            year: targetYear,
            month: targetMonth,
        });

        expect(tasks).toHaveLength(1);
    });

    it("Should get only the tasks with matching query", async () => {
        const currentDate = new Date();

        await sequelizeTaskRepository.save(dummyUser._id, {
            title: "new task 1 with QUERY",
            description: "This task should appear in the search",
            endsAt: currentDate.toISOString(),
            startsAt: currentDate.toISOString(),
        });

        await sequelizeTaskRepository.save(dummyUser._id, {
            title: "new task 2",
            description: "Task that has the query",
            endsAt: currentDate.toISOString(),
            startsAt: currentDate.toISOString(),
        });

        await sequelizeTaskRepository.save(dummyUser._id, {
            title: "ghost task",
            description: "This task should no be returned",
            endsAt: currentDate.toISOString(),
            startsAt: currentDate.toISOString(),
        });

        const tasks = await sequelizeTaskRepository.findManyByQuery(
            dummyUser._id,
            "query",
        );

        expect(tasks).toHaveLength(2);
    });
});
