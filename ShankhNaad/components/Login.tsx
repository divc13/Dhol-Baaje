import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { checkSignature, generateNonce } from '@meshsdk/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WALLET_BY_ADDRESS } from '../graphql/query';
import { SAVE_WALLET } from '../graphql/mutation';

const GetWalletComponent = ({ wallet }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const { loading, error, data } = useQuery(GET_WALLET_BY_ADDRESS, {
    variables: {
      address: walletAddress,
    },
  });

  const [saveWallet] = useMutation(SAVE_WALLET, {
    variables: {
      address: walletAddress,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (wallet) {
          const address = await wallet.getChangeAddress();
          setWalletAddress(address);
        }
      } catch (error) {
        console.error('Error fetching wallet address:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array for component mount

  useEffect(() => {
    if (data) {
      // Handle data from the query (data represents the result of GET_WALLET_BY_ADDRESS query)
      console.log('Fetched wallet data:', data);
    }

    if (error) {
      console.error('Error fetching wallet data:', error);
    }

    if (!data) {
      // If data is not available, perform saveWallet mutation
      saveWallet();
    }
  }, [data, error, saveWallet]);

  if (loading) return <p>Loading...</p>;

  // Return any other components or UI based on the fetched data
  return null;
};

const Login = () => {
  // const { wallet } = useWallet();

  // const backendVerifySignature = async (nonce, userAddress, signature) => {
  //   try {
  //     const result = checkSignature(nonce, userAddress, signature);
  //     if (result) {
  //       console.log('Signature verification successful');
  //     } else {
  //       console.log('Signature verification failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during signature verification:', error);
  //   }
  // };

  // const backendGetNonce = async (userAddress) => {
  //   const nonce = generateNonce('Sign to login in to Dhol Baaje: ');
  //   return nonce;
  // };

  // const frontendSignMessage = async (nonce) => {
  //   try {
  //     const userAddress = (await wallet.getRewardAddresses())[0];
  //     const signature = await wallet.signData(userAddress, nonce);
  //     await backendVerifySignature(nonce, userAddress, signature);
  //   } catch (error) {
  //     console.error('Error during message signing:', error);
  //   }
  // };

  const [username, setUsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [walletData, setWalletData] = useState(null);

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handleCheckUsernameAvailability = async () => {
    // Perform a GraphQL query to check username availability
    // Replace 'YOUR_GRAPHQL_QUERY_HERE' with your actual GraphQL query
    // Ensure to handle the response and update the isUsernameAvailable state accordingly
    // Example:
    // const isAvailable = await checkUsernameAvailability(username);
    // setIsUsernameAvailable(isAvailable);
    // For simplicity, we'll assume the username is available.
    setIsUsernameAvailable(true);
  };

  const handleLogin = async () => {
    // if (wallet) {
      // await frontendSignMessage();
    // }
  };

  return (
    <section className="w-screen mb-32 sm:mb-20 md:w-[calc(100vw-120px)] ml-2 sm:ml-24 py-4 space-y-8 md:mr-2.5 md:max-w-[79rem] flex sm:justify-center sm:items-center h-screen">
      <form className="w-full p-4 bg-black rounded-md shadow-lg flex justify-center items-center h-screen">
        <div className="w-full sm:w-1/4 md:w-5/12 transform -translate-y-11">
          <Image
            src="/../public/logo.png"
            alt=""
            className="w-full object-contain opacity-100 group-hover:scale-110 p-2"
            width={1000}
            height={1000}
            draggable="false"
          />
          <input
            type="text"
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md font-black text-black"
          />
          <div onClick={handleCheckUsernameAvailability} className="center btn-secondary mt-2 bg-green-600 text-white px-4 py-2 my-4 rounded hover:bg-green-800 text-center">
            Check Username Availability
          </div>
          {isUsernameAvailable && (
            <>
              <CardanoWallet label="Sign In with Cardano" onConnected={handleLogin} />
              <button onClick={handleLogin} className="btn-primary mt-2 ">
                Start Login Process
              </button>
              {/* <GetWalletComponent wallet={walletData} /> */}
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default Login;
