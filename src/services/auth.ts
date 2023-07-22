import GenericObject from "@/types/generic-object";
import HttpHandler from "@/utilities"

export default class AuthService {

    constructor() {

    }

    async signIn(data:{
        username:string
        password:string
    }) {
        return await HttpHandler.post("/api/auth/signin",data,{

        });
    }

    async checkSignIn(data:GenericObject) {
        return await HttpHandler.post("/api/auth/checkSessionValidity",{

        },{});
    }
}