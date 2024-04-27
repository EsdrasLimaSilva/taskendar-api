import { UserDTO } from "../../../dto/UserDTO";
import { UserRepository } from "../../../repository/UserRepository";

export class RegisterUserService {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string, user: UserDTO) {
        if (await this.userRepository.findByUsername(user.username)) {
            throw new Error("User already registered");
        }

        await this.userRepository.save(userId, user);
    }
}
