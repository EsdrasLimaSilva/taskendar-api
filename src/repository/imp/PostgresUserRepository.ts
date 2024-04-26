import { uuid } from "uuidv4";
import { UserDTO } from "../../dto/UserDTO";
import { UserModel } from "../../model/UserModel";
import { UserRepository } from "../UserRepository";

export class PostgresUserRepository implements UserRepository {
    async save(user: UserDTO): Promise<void> {
        await UserModel.sync();
        user._id = uuid();

        UserModel.create({ ...user });
    }
    async findOne(userId: string): Promise<UserDTO | null> {
        await UserModel.sync();
        const user = await UserModel.findByPk(userId);

        return user
            ? new UserDTO(
                  user.getDataValue("username"),
                  user.getDataValue("_id"),
              )
            : null;
    }

    async findByUsername(username: string): Promise<UserDTO | null> {
        UserModel.sync();
        const user = await UserModel.findOne({ where: { username } });

        return user
            ? new UserDTO(
                  user.getDataValue("username"),
                  user.getDataValue("_id"),
              )
            : null;
    }
}
