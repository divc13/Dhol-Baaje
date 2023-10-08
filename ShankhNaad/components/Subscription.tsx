import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LiveUser } from "../atoms/playerAtom";
import { useRouter } from 'next/router';

const Subscription = () => {
  const liveUser = useRecoilValue(LiveUser);
  const currentDate = new Date();
  const router = useRouter();

  // if (!liveUser || (liveUser.subscriptionEndDate && (new Date(liveUser.subscriptionEndDate) > currentDate))) {
  //   router.push('/');
  // }

  const handleSubscription = () => {

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
          <button onClick={handleSubscription} className="border border-white transparent rounded hover:bg-red-500 mt-4 p-2 py-3 hover:text-red">
            Subscribe Now : Only 25 Ada a month!!
          </button>
        </div>
      </form>
    </section>
  );
};

export default Subscription;
