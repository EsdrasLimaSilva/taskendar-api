import {
    PostgreSqlContainer,
    StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { configureSequelize } from "../config/sequelizeConfig";
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

    afterAll(async () => {
        await pgContainer.stop();
    });

    it("Should create a task sucessfully", async () => {
        const task = await sequelizeTaskRepository.save(dummyUser._id, {
            title: "New Task",
            description: "Dummy Description",
            endsAt: new Date().toISOString(),
            startsAt: new Date().toISOString(),
        });

        expect(task.title).toBe("New Task");
    });
});
