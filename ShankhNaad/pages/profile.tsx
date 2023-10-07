import React, { lazy, Suspense } from 'react';
import Head from 'next/head';
import PrivateRoute from '../PrivateRoute';

// Lazy load the Profile component
const LazyProfile = lazy(() => import('../components/Profile'));

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Dhol Baaje - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyProfile />
      </Suspense>
    </>
  );
};

export default PrivateRoute(ProfilePage);
