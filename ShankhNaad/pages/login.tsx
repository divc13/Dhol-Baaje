import React, { lazy, Suspense } from 'react';
import Head from 'next/head';

// Lazy load the Login component
const LazyLogin = lazy(() => import('../components/Login'));

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Dhol Baaje - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLogin />
      </Suspense>
    </>
  );
}
