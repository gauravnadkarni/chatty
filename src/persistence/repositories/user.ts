import UserModel from '../schemas/user';
import User from '../models/db/user';
import DbService from '../../services/db-service'

export default class UserRepository {
    constructor() { 

    }

    async getUserByUsername(email:string): Promise<User | null> {
        await DbService.connect();
        const user =  await UserModel.findOne({email});
        await DbService.disconnect();
        return user;
    }
}