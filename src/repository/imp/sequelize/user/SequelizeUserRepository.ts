import { Sequelize } from "sequelize";
import { UserDTO } from "../../../../dto/UserDTO";
import { UserRepository } from "../../../UserRepository";
import {
    SequelizeUserModel,
    SequelizeUserModelAttributes,
} from "./SequelizeUserModel";

export class SequelizeUserRepository implements UserRepository {
    constructor(sequelize: Sequelize) {
        // setting up
        SequelizeUserModel.init(SequelizeUserModelAttributes, {
            sequelize,
            tableName: "user",
        });
    }

    async save(userId: string, user: UserDTO): Promise<void> {
        await SequelizeUserModel.sync();
        SequelizeUserModel.create({ ...user, _id: userId });
    }
    async findOne(userId: string): Promise<UserDTO | null> {
        await SequelizeUserModel.sync();
        const user = await SequelizeUserModel.findByPk(userId);

        return user
            ? new UserDTO(
                  user.getDataValue("username"),
                  user.getDataValue("_id"),
              )
            : null;
    }

    async findByUsername(username: string): Promise<UserDTO | null> {
        SequelizeUserModel.sync();
        const user = await SequelizeUserModel.findOne({ where: { username } });

        return user
            ? new UserDTO(
                  user.getDataValue("username"),
                  user.getDataValue("_id"),
              )
            : null;
    }
}
