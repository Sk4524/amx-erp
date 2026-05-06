"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.access_token);
      router.push("/");
    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[380px]">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          AMX ERP Login
        </h2>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Enter Password"
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