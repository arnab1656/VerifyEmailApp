"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/forgetpassword", { email });
      // console.log(response.data);

      toast.success("Creation success");
    } catch (error: any) {
      // console.log("Login failed in debugging Purpose for dev", error.message);

      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
      <h1 className="text-2xl text-white mb-4">
        {loading ? "Processing" : "Verify Email for Forget Password "}
      </h1>
      <hr className="w-full max-w-md border-white mb-4" />

      <input
        className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:border-blue-400"
        id="email"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
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
  );
}
