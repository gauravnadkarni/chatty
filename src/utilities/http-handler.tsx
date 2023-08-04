import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import GenericObject from '../types/generic-object';

export default class HttpHandler {
    public static async genericRequest<T>(config:AxiosRequestConfig):Promise<AxiosResponse<T>> {
        return axios.request(config);
    }

    public static async  get<T>(url:string, config:AxiosRequestConfig):Promise<AxiosResponse<T>> {
        return axios.get(url, config);
    }

    public static async  post<T>(url:string, data:GenericObject, config:AxiosRequestConfig):Promise<AxiosResponse<T>> {
        return axios.post(url, data, config);
    }
}