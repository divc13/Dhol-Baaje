import Head from "next/head";
import Subscription from "../components/Login";

export default function LoginPage() {

    return (
        <>
            <Head>
                <title>Dhol Baaje - Subscribe </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Subscription />
        </>
    );
};