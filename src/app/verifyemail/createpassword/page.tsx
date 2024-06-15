"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreatePassword() {
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const verifyEmailForPassReset = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/users/verifyemailpassrest`,
        {
          token,
        }
      );
      setVerified(true);
      console.log(response.data.email);
      setEmail(response.data.email);
      toast.success("Can reset the password");
    } catch (error: any) {
      console.log("error" + error);
    } finally {
      setPageLoader(false);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/users/resetpassword`,
        {
          confirmPassword,
          email,
        }
      );
      // console.log(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmailForPassReset();
    }
  }, [token]);

  useEffect(() => {
    if (
      createPassword &&
      confirmPassword &&
      createPassword === confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [createPassword, confirmPassword]);

  return (
    <div>
      {pageLoader ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500"></div>
        </div>
      ) : verified ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
          <h1 className="text-2xl text-white mb-4">
            {loading ? "Processing" : "Create New Password"}
          </h1>
          <hr className="w-full max-w-md border-white mb-4" />

          <input
            className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:border-blue-400"
            id="createPassword"
            type="password"
            onChange={(e) => setCreatePassword(e.target.value)}
            placeholder="Create Password"
          />

          <input
            className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:border-blue-400"
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <button
            onClick={onSubmit}
            className="p-2 border-none rounded-lg mb-4 w-full max-w-md bg-blue-500 text-white cursor-pointer text-lg transition duration-300 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={buttonDisabled}
          >
            Submit
          </button>
          <Link
            href="/login"
            className="text-white underline mt-4 hover:text-yellow-400"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
          <h1 className="text-2xl text-white">
            Invalid token for password reset
          </h1>
        </div>
      )}
    </div>
  );
}
