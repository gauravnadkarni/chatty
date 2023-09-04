import mongoose from 'mongoose';
import dbConnectService from './db-connection-service';

export default class DbService {
    static connection: typeof mongoose | null = null;;
    private constructor() {
        
    }

    static async connect() {
        this.connection = await dbConnectService.dbConnect();
    }

    static async disconnect() {
        dbConnectService.dbDisconnect();
    }
}