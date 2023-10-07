import React, { lazy, Suspense } from 'react';
import Head from 'next/head';

// Lazy load the Dashboard component
const LazyDashboard = lazy(() => import('../components/Dashboard'));

export default function Home() {
  return (
    <>
      <Head>
        <title>Dhol Baaje Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyDashboard />
      </Suspense>
    </>
  );
}
