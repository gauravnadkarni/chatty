import crypto from "crypto-js";
export default {
    encrypt: (data:string, secret:string):string => (crypto.AES.encrypt(data,secret).toString()),
    decrypt: (data:string, secret:string):string => (crypto.AES.decrypt(data,secret).toString(crypto.enc.Utf8)),
}