import Head from "next/head";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dhol Baaje Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
