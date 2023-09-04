import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Component, ComponentType, Fragment, PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../utilities/loader";
import { useSession } from "next-auth/react";

export default function withAuth<T>(WrappedComponent:ComponentType<PropsWithChildren<T>>){
    const WithAuth = (props:PropsWithChildren<T>) => {
        const {data:session} = useSession();
        const router = useRouter();
        const [isSignedIn, setSignedIn] = useState<boolean>(false);
        useEffect(()=>{
            if(session) {
                setSignedIn(true);
            } else {
                router.replace("/");
            }
        },[]);
        if(isSignedIn === true) {
            return <WrappedComponent {...props}/>
        }
        return (<Loader varient="indeterminate" color="primary" />);
    }

    WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithAuth;
}