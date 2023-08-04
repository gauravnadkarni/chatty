import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../utilities/loader";
import { useSession } from "next-auth/react";


type SecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const Secured:NextPage<PropsWithChildren<SecuredProps>>= (props:PropsWithChildren<SecuredProps>) => {
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
        return <Fragment>{props.children}</Fragment>
    } 

    return (<Loader varient="indeterminate" color="primary" />);
}

export default Secured