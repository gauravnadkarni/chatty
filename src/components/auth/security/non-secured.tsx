import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NextRouter, useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../utilities/loader";
import { useSession } from "next-auth/react";

type NonSecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const NonSecured:NextPage<PropsWithChildren<NonSecuredProps>> = (props:PropsWithChildren<NonSecuredProps>) => {
    const {data:session} = useSession();
    const router = useRouter();
    const [isSignedIn, setSignedIn] = useState<boolean>(true);
    useEffect(()=>{
        if(session) {
            router.replace("/dashboard");
        } else {
            setSignedIn(false);
        }
    },[]);


    if(isSignedIn === false) {
        return <Fragment>{props.children}</Fragment>
    } 

    return (<Loader varient="indeterminate" color="primary" />);
}

export default NonSecured