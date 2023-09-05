import GenericObject from "@/types/generic-object";
import AbstractError from "./abstract-error";

export default class ServerConfigurationMissingError extends AbstractError {
    uiMessage:string;
    constructor(technicalMessage:string,errorCode:number,uiMessage:string,rootError?:Error) {
        super(technicalMessage,errorCode,rootError);
        this.uiMessage=uiMessage;
    }
}