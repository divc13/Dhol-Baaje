import Head from "next/head";
import Login from "../components/Login";

export default function LoginPage() {

    return (
        <>
            <Head>
                <title>Dhol Baaje - Login </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login />
        </>
    );
};