import GenericObject from "@/types/generic-object";
import AbstractError from "./abstract-error";

export default class DatabaseConnectionError extends AbstractError {
    constructor(message:string,errorCode:number,rootError?:Error) {
        super(message,errorCode,rootError);
    }
}