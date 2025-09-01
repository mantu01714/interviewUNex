"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

function UserSetting() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [Rate, setRate] = useState(0);
  const router = useRouter();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    setInterviewList(Interviews);

    // mock success rate
    const minSuccessRate = 70;
    const maxSuccessRate = 90;
    const CalcRate =
      Math.floor(Math.random() * (maxSuccessRate - minSuccessRate + 1)) +
      minSuccessRate;
    setRate(CalcRate);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push("/");
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      document.cookie =
        "userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      router.push("/");
    } catch {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-6 sm:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Account Settings
        </h1>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="hover:bg-blue-50 border-blue-200"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Profile Card */}
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white flex flex-col sm:flex-row items-center gap-6">
          <img
            src={
              user.user_metadata?.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.user_metadata?.full_name || user.email
              )}&background=ffffff&color=3b82f6&size=128`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              {user.user_metadata?.full_name || "AiCruiter User"}
            </h2>
            <p className="text-blue-100">{user.email}</p>
            <p className="text-sm text-blue-200">✔ Verified Account</p>
          </div>
        </div>

        <div className="p-6 grid gap-6 md:grid-cols-2">
          {/* Account Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Account Information
            </h3>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700">Full Name</p>
              <p className="font-medium">
                {user.user_metadata?.full_name || "Not provided"}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700">Email</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700">Account Created</p>
              <p className="font-medium">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl">
                <p className="text-2xl font-bold">{interviewList.length}</p>
                <p className="text-sm">Interviews</p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl">
                <p className="text-2xl font-bold">{interviewList.length}</p>
                <p className="text-sm">Job Positions</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm">Hours Practiced</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-xl">
                <p className="text-2xl font-bold">{Rate}%</p>
                <p className="text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="p-6 h-auto flex flex-col items-center justify-center gap-2 border-blue-200 hover:bg-blue-50"
        >
          <span className="text-lg font-semibold">Dashboard</span>
          <span className="text-xs text-gray-500">View your dashboard</span>
        </Button>
        <Button
          onClick={() => router.push("/all-interview")}
          variant="outline"
          className="p-6 h-auto flex flex-col items-center justify-center gap-2 border-blue-200 hover:bg-blue-50"
        >
          <span className="text-lg font-semibold">Interview History</span>
          <span className="text-xs text-gray-500">Past interviews</span>
        </Button>
        <Button
          onClick={() => router.push("/billing")}
          variant="outline"
          className="p-6 h-auto flex flex-col items-center justify-center gap-2 border-blue-200 hover:bg-blue-50"
        >
          <span className="text-lg font-semibold">Credits</span>
          <span className="text-xs text-gray-500">Purchase Plans</span>
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="mt-10 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-red-600 mb-4">
          Danger Zone
        </h3>
        <p className="text-sm text-red-500 mb-4">
          Sign out of your account. You’ll need to log in again to access your
          dashboard.
        </p>
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
        >
          {isLoggingOut ? "Signing Out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}

export default UserSetting;
