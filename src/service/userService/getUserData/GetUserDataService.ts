import { UserDTO } from "../../../dto/UserDTO";
import { UserRepository } from "../../../repository/UserRepository";

export class GetUserDataService {
    constructor(private userRepository: UserRepository) {}

    async execute(uid: string): Promise<UserDTO> {
        const userInfo = await this.userRepository.findOne(uid);
        if (!userInfo) throw new Error("User not found!");
        return userInfo;
    }
}
