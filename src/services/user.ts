import AppAuthenticationError from "@/errors/app-authentication-error";
import User from "@/persistence/models/db/user";
import UserRepository from "@/persistence/repositories/user";
import security from '../utilities/security';
import constants from "@/configurations/constants";
import ServerConfigurationMissingError from "@/errors/server-configuration-missing-error";

export default class UserService {
    userRepository:UserRepository;

    constructor(userRepository:UserRepository) {
        this.userRepository = userRepository;
    }

    async getUserByUsernameAndPassword(email:string, password:string):Promise<User> {
        if(!constants.NEXTAUTH_SECRET) {
            throw new ServerConfigurationMissingError(`Unable to find configuration value for {NEXTAUTH_SECRET}`, 500,`Problem encountered on server. Please try after some time`);
        }
        const user: User | null = await this.userRepository.getUserByUsername(email);
        if(!user) {
            throw new AppAuthenticationError(`Unable to find the user with email: ${email}`, 401);
        }
        const encryptedPassword:string = user.password;
        const decryptedPassword:string = security.decrypt(password,constants.NEXTAUTH_SECRET);
        if(encryptedPassword!==decryptedPassword) {
            throw new AppAuthenticationError(`Credentials are not matching: ${email}`, 401);
        }
        return user;
    }
}