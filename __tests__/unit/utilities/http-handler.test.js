import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import HttpHandler from '../../../src/utilities/http-handler';
import '@testing-library/jest-dom';
 
jest.mock("axios")

describe('NonSecured Component', () => {
    beforeEach(() => {

    });

    afterEach(() => {

    });


    it('expect request method to work with get request', async() => {
        const axiosMockImple = jest.spyOn(axios, "request");
        axiosMockImple.mockImplementation(async(config) => {
            if(!config.url || !config.method) {
                return {};
            }
            if(config.method !== 'get') {
                return {};
            }
            return {
                data: {id:42,email:"james@aol.com"},
                status: 200,
                statusText: "success",
                headers: {},
                config: {},
                request: {},
        }});
        const res = await HttpHandler.genericRequest({url:"htp://localhost:3000/api/user", method: 'get'},);

        expect(res).toHaveProperty('data');
        expect(res).toHaveProperty('status');
        expect(res.data).toEqual(expect.objectContaining({
            id: 42,
            email: "james@aol.com",
        }))
        expect(res.status).toBe(200);
    })

    it('expect request method to work with post request', async() => {
        const axiosMockImple = jest.spyOn(axios, "request");
        axiosMockImple.mockImplementation(async(config) => {
            if(!config.url || !config.method) {
                return {};
            }
            if(config.method !== 'post') {
                return {};
            }
            return {
                data: {id:42,email:"james@aol.com"},
                status: 200,
                statusText: "success",
                headers: {},
                config: {},
                request: {},
        }});
        const res = await HttpHandler.genericRequest({url:"htp://localhost:3000/api/user", method: 'post'},);

        expect(res).toHaveProperty('data');
        expect(res).toHaveProperty('status');
        expect(res.data).toEqual(expect.objectContaining({
            id: 42,
            email: "james@aol.com",
        }))
        expect(res.status).toBe(200);
    })

    it('expect get method to work with get request', async() => {
        const axiosMockImple = jest.spyOn(axios, "get");
        axiosMockImple.mockImplementation(async() => ({
            data: {id:42,email:"james@aol.com"},
            status: 200,
            statusText: "success",
            headers: {},
            config: {},
            request: {},
        }));
        const res = await HttpHandler.get("htp://localhost:3000/api/user",{});

        expect(res).toHaveProperty('data');
        expect(res).toHaveProperty('status');
        expect(res.data).toEqual(expect.objectContaining({
            id: 42,
            email: "james@aol.com",
        }))
        expect(res.status).toBe(200);
    })

    it('expect post method to work with post request', async () => {
        const axiosMockImple = jest.spyOn(axios, "post");
        axiosMockImple.mockImplementation(async() => ({
            data: {id:42,email:"james@aol.com"},
            status: 201,
            statusText: "success",
            headers: {},
            config: {},
            request: {},
        }));
        const res = await HttpHandler.post("htp://localhost:3000/api/user",{});

        expect(res).toHaveProperty('data');
        expect(res).toHaveProperty('status');
        expect(res.data).toEqual(expect.objectContaining({
            id: 42,
            email: "james@aol.com",
        }))
        expect(res.status).toBe(201);
    })

})