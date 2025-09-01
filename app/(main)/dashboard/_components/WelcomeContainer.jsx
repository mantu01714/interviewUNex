"use client";
import React from "react"
import { useUser } from '@/app/provider'
import { useUserStore } from "@/app/zustand/useUserStore";
import Image from "next/image";
import { useRouter } from 'next/navigation';
function WelcomeContainer() {
  // const user = useUserStore((state) => state.user);
  const {user} = useUser();
  const router = useRouter();
  // console.log(user?.name, "name");
  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center  mt-10 mx-8'>
      <div>
        <h2 className='text-lg font-bold'>Welcome Back, {user?.name}</h2>
        <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
      </div>
      {user &&<Image onClick={() => router.push('/settings')} src={user?.picture} alt="userAvatar" 
        width={40} height={40}
        className='rounded-full'
        />}
    </div>
  );
}

export default WelcomeContainer;