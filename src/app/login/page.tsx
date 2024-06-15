"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("Login success", response.data);

      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log(
        "Login failed in debugging Purpose for dev",
        error.response.data.error
      );
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
      <h1 className="text-2xl text-white mb-4">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr className="w-full max-w-md border-white mb-4" />

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
        onClick={onLogin}
        className="p-2 border-none rounded-lg mb-4 w-full max-w-md bg-blue-500 text-white cursor-pointer text-lg transition duration-300 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Login here
      </button>
      <Link
        href="/signup"
        className="text-white underline mt-4 hover:text-yellow-400"
      >
        Visit Signup page
      </Link>
      <Link
        href="/forgetpassword"
        className="text-white underline mt-4 hover:text-yellow-400"
      >
        Forget Password
      </Link>
    </div>
  );
}
