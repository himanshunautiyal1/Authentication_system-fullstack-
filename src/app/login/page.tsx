"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onlogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed:", error.response.data.error);
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="bg-white py-2 px-2  text-gray-900 rounded-lg"
        type="text"
        id="email"
        autoComplete="off"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="bg-white py-2 px-2  text-gray-900 rounded-lg"
        type="password"
        data-id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 rounded-lg hover:cursor-pointer border-gray-300 mb-4 focus:outline-none focus:border-gray-600 bg-gray-600 mt-2 "
        onClick={onlogin}
      >
        Login
      </button>
      <Link href="/signup">Visit signup page</Link>
    </div>
  );
}
