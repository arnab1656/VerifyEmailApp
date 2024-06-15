"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      console.log(token);
      await axios.post("/api/users/verifyemail", { token });

      // console.log(response.data);

      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
      <h1 className="text-4xl text-white mb-4">Verify Email</h1>
      <hr className="w-full max-w-md border-white mb-4" />
      <h2 className="p-2 bg-orange-500 text-black rounded-lg w-full max-w-md text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl text-white">Email Verified</h2>
          <Link
            href="/login"
            className="text-white underline mt-4 hover:text-yellow-400"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl bg-red-500 text-black p-2 rounded-lg">
            Error
          </h2>
        </div>
      )}
    </div>
  );
}
