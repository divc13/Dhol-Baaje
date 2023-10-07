import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { checkSignature, generateNonce } from '@meshsdk/core';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_WALLETS } from '../graphql/query';
import { useSetRecoilState } from "recoil";
import { UserAddress } from "../atoms/playerAtom";

const Login = () => {
  const { wallet, connected, disconnect } = useWallet();
  // const [address, setAddress] = useState('');
  const [validity, setValidity] = useState('Waiting for Wallet');
  const { data } = useQuery(GET_ALL_WALLETS);
  const setAddress = useSetRecoilState(UserAddress);

  async function backendGetNonce(userAddress) {
    const nonce = generateNonce('Sign to login in to Dhol Baaje: ');
    return nonce;
  }
  
  async function backendVerifySignature(nonce, userAddress, signature) {
    const result = checkSignature(nonce, userAddress, signature);
    if (result) {
        console.log("success");
        const addr = await wallet.getChangeAddress();
        if (!data || !data.walletFindAll.some(wallet => wallet.address === addr)){
          setValidity('Wallet not Registered');
          disconnect();
        }
        else
        {
          setAddress(addr);
          setValidity('User Logged In');
        }
      }
      else {
          console.log("fail");
        }
      }

  async function frontendStartLoginProcess() {
    if (connected) {
          const userAddress = (await wallet.getRewardAddresses())[0];
          const nonce = await backendGetNonce(userAddress);
          await frontendSignMessage(nonce);
      }
  }
  
  async function frontendSignMessage(nonce) {
      // try {
        const userAddress = (await wallet.getRewardAddresses())[0];
        const signature = await wallet.signData(userAddress, nonce);
        await backendVerifySignature(nonce, userAddress, signature);
      // } catch (error) {
      //     console.log("failure");
      // }
    }

     

  return (
    <section className="w-screen mb-32 sm:mb-20 md:w-[calc(100vw-120px)] ml-2 sm:ml-24 py-4 space-y-8 md:mr-2.5 md:max-w-[79rem] flex sm:justify-center sm:items-center h-screen">
      <form className="w-full p-4 bg-black rounded-md shadow-lg flex justify-center items-center h-screen">
        <div className="w-full sm:w-1/4 md:w-5/12 transform -translate-y-11 flex flex-col items-center">
          <Image
            src="/../public/logo.png"
            alt=""
            className="w-full object-contain opacity-100 group-hover:scale-110 p-2"
            width={1000}
            height={1000}
            draggable="false"
          />
          {validity === 'Waiting for Wallet' &&
            <CardanoWallet label="Sign In with Cardano" onConnected={() => frontendStartLoginProcess()} />}
          {validity === 'User Logged In' &&
          <>
            <CardanoWallet label="Sign In with Cardano" />
            <div>Now you can access all pages!!</div>
          </>}
          {validity === 'Wallet not Registered' &&
          <>
            <CardanoWallet label="Sign In with Cardano" onConnected={() => frontendStartLoginProcess()} />
            <div>This wallet is not registered.</div>
          </>}
        </div>
      </form>
    </section>
  );
};

export default Login;
