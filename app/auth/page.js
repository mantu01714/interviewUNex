"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'

function Login() {
  // use to signin with google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
       options: {
        // 👇 Automatically picks localhost or Vercel domain
        redirectTo: `${window.location.origin}/dashboard` 
      }
    });
    if(error){
      toast('Error in signing in with Google');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl w-full max-w-md">
        
        {/* Logo */}
        <Image
          src={'/logo.png'}
          alt="logo"
          width={230}
          height={60}
          className="w-[160px] mb-6"
        />

        {/* Illustration */}
        <Image
          src={'/login.png'}
          alt="login"
          width={600}
          height={400}
          className="w-[300px] h-[200px] rounded-xl shadow-md mb-6"
        />

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-white text-center">
          Welcome to <span className="text-blue-400">interviewUNex</span>
        </h2>
        <p className="text-gray-300 text-center mt-2">
          Sign in with Google to continue
        </p>

        {/* Button */}
        <Button
          className="mt-7 w-full bg-white text-black font-medium py-6 text-lg rounded-xl 
                     hover:bg-transparent hover:text-white hover:border hover:border-white 
                     transition-all duration-300 shadow-lg"
          onClick={signInWithGoogle}
        >
          Login with Google
        </Button>
      </div>
    </div>
  )
}

export default Login
