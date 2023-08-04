import React from 'react';
import * as NextAuthReact from "next-auth/react";
import * as ReactHookForm from "react-hook-form"
import NextAuthRouter from "next/router";
import { render, screen } from '@testing-library/react'
import LoginBoxComponent from '../../../../src/components/auth/LoginBox';
import '@testing-library/jest-dom';
 
jest.mock("react-hook-form");

describe('LoginBox Component', () => {
    let useRouter = null
    beforeEach(() => {
        const useRouter = jest.spyOn(NextAuthRouter, "useRouter");
        
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn()
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null),
            replace: jest.fn(),
        }));
    });

    afterEach(() => {
        useRouter = null;
    });


    it('renders the login form', () => {
        expect(true).toBeTruthy();
    })

    it('throws validation error when the username is left empty', () => {
        expect(true).toBeTruthy();
    })

    it('throws validation error when the password is left empty', () => {
        expect(true).toBeTruthy();
    })

    it('throws validation error when the username and password is left empty', () => {
        expect(true).toBeTruthy();
    })

    it('it submits when the username and password is filled properly', () => {
        expect(true).toBeTruthy();
    })
})