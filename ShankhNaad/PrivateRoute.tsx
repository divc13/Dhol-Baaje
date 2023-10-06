// PrivateRoute.tsx
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWallet } from "@martifylabs/mesh-react";

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const WrapperComponent = (props: any) => {
    const { connected } = useWallet();
    const router = useRouter();

    useEffect(() => {
      if (!connected) {
        router.push('/login');
      }
    }, [connected, router]);

    if (!connected) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default PrivateRoute;
