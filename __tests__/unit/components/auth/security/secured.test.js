import React from 'react';
import * as NextAuthReact from "next-auth/react";
import NextAuthRouter from "next/router";
import { render, screen } from '@testing-library/react'
import SecuredComponent from '../../../../../src/components/auth/security/secured'
import '@testing-library/jest-dom';
 
jest.mock("next-auth/react")

describe('NonSecured Component', () => {
    let replaceMock = null;
    let useRouter = null
    beforeEach(() => {
        replaceMock = jest.fn(f => null);
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
            replace: replaceMock
        }));
    });

    afterEach(() => {
        replaceMock = null;
        useRouter = null;
    });


    it('renders a loader at start', () => {
        jest.spyOn(React, 'useState').mockImplementation((initialValue) => ([false, f => jest.fn()]));
        jest.spyOn(NextAuthReact, 'useSession').mockImplementation(() => ({data:undefined}));

        const {getByRole} = render(<SecuredComponent />);
        const LoaderComponent = getByRole('progressbar');

        expect(LoaderComponent).toBeInTheDocument();
    })

    it('expect it to redirect to login if user is not logged in', () => {
        jest.spyOn(React, 'useState').mockImplementation((initialValue) => ([false, f => jest.fn()]));
        jest.spyOn(NextAuthReact, 'useSession').mockImplementation(() => ({data:undefined}));
        render(<SecuredComponent />)

        expect(replaceMock).toHaveBeenCalledWith("/");
    })

    it('expect it to display the secured page', () => {
        jest.spyOn(React, 'useState').mockImplementation((initialValue) => ([true, f => jest.fn()]));
        jest.spyOn(NextAuthReact, 'useSession').mockImplementation(() => ({data:{id:42}}));
        const {getByTestId} = render(<SecuredComponent><div data-testid="placeholderDiv"></div></SecuredComponent>)
        const placeholderComponent = getByTestId('placeholderDiv');

        expect(placeholderComponent).toBeInTheDocument();
    })
})