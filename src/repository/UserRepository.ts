import { UserDTO } from "../dto/UserDTO";

export interface UserRepository {
    save(user: UserDTO): Promise<void>;

    findOne(userId: string): Promise<UserDTO | null>;

    findByUsername(username: string): Promise<UserDTO | null>;
}
