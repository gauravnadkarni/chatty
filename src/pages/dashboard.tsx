
import { NextPage } from "next";
import classes from './dashboard.module.css';
import Secured from "@/components/auth/security/secured";
import { PropsWithChildren } from "react";
import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/dashboard";

const DashboardPage:NextPage  = (props:PropsWithChildren) => {
    return (
        <Secured>
            <Layout>
                <Dashboard />
            </Layout>
        </Secured>   
    )
}

export default DashboardPage;