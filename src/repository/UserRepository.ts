import { UserDTO } from "../dto/UserDTO";

export interface UserRepository {
    save(userId: string, user: UserDTO): Promise<void>;

    findOne(userId: string): Promise<UserDTO | null>;

    findByUsername(username: string): Promise<UserDTO | null>;
}
