import React, { lazy, Suspense } from 'react';
import Head from 'next/head';
import PrivateRoute from '../PrivateRoute';

// Lazy load the UploadForm component
const LazyUploadForm = lazy(() => import('../components/UploadForm'));

const TrackForm = () => {
  return (
    <>
      <Head>
        <title>Dhol Baaje - Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyUploadForm />
      </Suspense>
    </>
  );
};

export default PrivateRoute(TrackForm);
