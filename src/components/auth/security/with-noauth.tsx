import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Component, ComponentType, Fragment, PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../utilities/loader";
import { useSession } from "next-auth/react";

export default function withNoAuth<T>(WrappedComponent:ComponentType<PropsWithChildren<T>>){
    const WithNoAuth = (props:PropsWithChildren<T>) => {
        const {data:session} = useSession();
        const router = useRouter();
        const [isSignedIn, setSignedIn] = useState<boolean>(true);
        useEffect(()=>{
            console.log(session,"use effect")
            if(session) {
                router.replace("/dashboard");
            } else if(session===null) {
                setSignedIn(false);
            }
        },[session]);
        if(isSignedIn === false) {
            return <WrappedComponent {...props}/>
        }
        return (<Loader varient="indeterminate" color="primary" />);
    }

    WithNoAuth.displayName = `withNoAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithNoAuth;
}