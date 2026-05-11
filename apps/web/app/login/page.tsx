"use client";

import { useState, useEffect } from "react";

import api from "../../lib/api";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }

  }, []);

  const handleLogin = async () => {

    try {

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.data.access_token
      );

      // SAVE ROLE
      localStorage.setItem(
        "role",
        res.data.data.user.role
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.data.user)
      );

      alert("Login Success ✅");

      router.push("/");

    } catch (err: any) {

      console.log(err);

      alert(
        JSON.stringify(
          err?.response?.data || "Login Failed"
        )
      );
    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[380px]">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          AMX ERP Login
        </h2>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 text-black"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Secure Enterprise Login
        </p>

      </div>

    </div>
  );
}