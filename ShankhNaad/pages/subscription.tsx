import React, { lazy, Suspense } from 'react';
import Head from 'next/head';

// Lazy load the Subscription component
const LazySubscription = lazy(() => import('../components/Subscription'));

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Dhol Baaje - Subscribe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <LazySubscription />
      </Suspense>
    </>
  );
}
