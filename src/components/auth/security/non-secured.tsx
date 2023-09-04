import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NextRouter, useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../utilities/loader";
import { useSession } from "next-auth/react";
import withNoAuth from "../security/with-noauth";

type NonSecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const NonSecured:NextPage<PropsWithChildren<NonSecuredProps>> = (props:PropsWithChildren<NonSecuredProps>) => {
    return <Fragment>{props.children}</Fragment>
}

export default withNoAuth(NonSecured);