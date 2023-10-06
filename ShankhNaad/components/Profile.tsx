import React, { useState } from 'react';
import MySongs from './MySongs';
import { FaCoins } from 'react-icons/fa';

const Profile = () => {
  return (
    <section className="sm:ml-24 w-full overflow-y-scroll scrollbarThin">
      <div className="flex w-full justify-between item-center bg-black p-2 fixed">
        <div className="text-xl text-green-500 font-bold">My Songs</div>
        <div className="flex items-center bg-white/10 border-2 border-[#262626] rounded-full h-8 px-10 hover:scale-110 sm:mr-24">
          <FaCoins className="w-5 h-5 mr-2" aria-hidden="true" />
          0
        </div>
      </div>
      <div className="mt-12">
        <MySongs />
      </div>
    </section>
  );
};

export default Profile;
