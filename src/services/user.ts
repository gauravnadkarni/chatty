import AppAuthenticationError from "@/errors/app-authentication-error";
import User from "@/persistence/models/db/user";
import UserRepository from "@/persistence/repositories/user";

export default class UserService {
    userRepository:UserRepository;

    constructor(userRepository:UserRepository) {
        this.userRepository = userRepository;
    }

    async getUserByUsernameAndPassword(email:string, password:string):Promise<User> {
        const user: User | null = await this.userRepository.getUserByUsername(email);
        if(!user) {
            throw new AppAuthenticationError(`Unable to find the user with email: ${email}`, 401);
        }
        return user;
        //return { id: "1", username: "J Smith", email: "jsmith123@example.com" }
    }
}