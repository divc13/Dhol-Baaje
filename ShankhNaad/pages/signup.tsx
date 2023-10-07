import React, { lazy, Suspense } from 'react';
import Head from 'next/head';

const LazySignUp = lazy(() => import('../components/SignUp'));

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Dhol Baaje - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <LazySignUp />
      </Suspense>
    </>
  );
}
