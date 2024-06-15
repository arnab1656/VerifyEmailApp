"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log("Signup success", response.data);

      toast.success("SignUp success");
      router.push("/login");
    } catch (error: any) {
      // console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
      <h1 className="text-2xl text-white mb-4">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr className="w-full max-w-md border-white mb-4" />

      <input
        className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:border-blue-400"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

      <input
        className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:border-blue-400"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <input
        className="p-2 border-2 border-white rounded-lg mb-4 w-full max-w-md bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:border-blue-400"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`p-2 border-none rounded-lg mb-4 w-full max-w-md text-white cursor-pointer text-lg transition duration-300 ${
          buttonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>

      <Link
        href="/login"
        className="text-white underline mt-4 hover:text-yellow-400"
      >
        Visit login page
      </Link>
    </div>
  );
}
