import GenericObject from "@/types/generic-object";

export default class AbstractError extends Error {
    errorCode:number;
    rootError:Error | undefined;
    constructor(message:string,errorCode:number,rootError?:Error) {
        super(message);
        this.errorCode = errorCode;
        this.rootError = rootError;
    }
}