import GenericObject from "@/types/generic-object";
import AbstractError from "./abstract-error";

export default class DataValidationError extends AbstractError {
    errorObject:GenericObject;
    constructor(message:string,errorCode:number,errorObject:GenericObject,rootError?:Error) {
        super(message,errorCode,rootError);
        this.errorObject=errorObject;
    }
}