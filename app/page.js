"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Provider from "./provider";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session) {
        document.cookie = `userSession=${JSON.stringify(session?.provider_token)}; path=/`;
      }
      setLoading(false);
    };
    getSession();

    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (subscription) subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const signInWithGoogle = async () => router.push("/auth");
  const signOut = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
    document.cookie = "userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };
  const goToDashboard = () => {
    router.push("/dashboard");
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <Provider />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full bg-white/10 backdrop-blur-lg border-b border-white/10 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="interviewUNex Logo"
                width={100}
                height={100}
                className="h-12 w-auto"
              />
              {/* <span className="text-xl font-bold text-white tracking-wide">
                interviewUNex
              </span> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {!isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={user.user_metadata?.avatar_url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-white/30"
                  />
                  <span className="text-sm">{user.user_metadata?.full_name}</span>
                  <Button onClick={goToDashboard} variant="secondary" size="sm">
                    Dashboard
                  </Button>
                  <Button onClick={signOut} variant="ghost" size="sm" className="text-white">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={signInWithGoogle}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-3 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.user_metadata?.avatar_url}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-white/30"
                    />
                    <span>{user.user_metadata?.full_name}</span>
                  </div>
                  <Button onClick={goToDashboard} className="w-full bg-pink-600 hover:bg-pink-700">
                    Dashboard
                  </Button>
                  <Button onClick={signOut} variant="ghost" className="w-full text-white">
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={signInWithGoogle}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center relative">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Crack Your
          <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Dream Interview
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10">
          AI-driven mock interviews, instant feedback, and personalized prep for your next big opportunity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Button
              onClick={goToDashboard}
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition"
            >
              Go to Dashboard →
            </Button>
          ) : (
            <>
              <Button
                onClick={signInWithGoogle}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-105 transition"
              >
                Start Practicing
              </Button>
              <Button
  variant="outline"
  size="lg"
  className="px-8 py-4 text-lg rounded-xl bg-white text-black font-medium shadow-md 
             hover:bg-transparent hover:text-white hover:border-white transition-all duration-300"
>
  Learn More
</Button>

            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-xl py-10 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3"/>
              </svg>
            </div>
            <span className="text-lg font-semibold">interviewUNex</span>
          </div>
          <div className="flex space-x-6 text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-6 text-sm">
          © 2025 interviewUNex. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
