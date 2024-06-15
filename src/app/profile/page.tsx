"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");

      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      // console.log(error.message);

      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    // console.log(response.data);
    setData(response.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
      <h1 className="text-4xl text-white mb-4">Profile</h1>
      <hr className="w-full max-w-md border-white mb-4" />
      <p className="text-white mb-4">Profile page</p>
      <h2 className="p-2 bg-green-500 text-black rounded-lg w-full max-w-md text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link
            href={`/profile/${data}`}
            className="text-black underline hover:text-white"
          >
            {data}
          </Link>
        )}
      </h2>
      <hr className="w-full max-w-md border-white my-4" />

      <button
        onClick={logout}
        className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-blue-500 text-white cursor-pointer text-lg transition duration-300 hover:bg-blue-600"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-green-800 text-white cursor-pointer text-lg transition duration-300 hover:bg-blue-600"
      >
        Get User Details
      </button>
    </div>
  );
}
