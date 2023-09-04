import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../utilities/loader";
import { useSession } from "next-auth/react";
import withAuth from "../security/with-auth";


type SecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const Secured:NextPage<PropsWithChildren<SecuredProps>>= (props:PropsWithChildren<SecuredProps>) => {
    return <Fragment>{props.children}</Fragment>
}

export default withAuth(Secured);