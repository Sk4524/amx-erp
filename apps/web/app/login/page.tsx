"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.access_token);

      router.push("/");
    } catch (err) {
      alert("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      {/* LOGIN CARD */}
      <div className="relative bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[430px] border border-white/30">

        {/* LOGO */}
        <div className="flex justify-center mb-5">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

            <span className="text-2xl font-bold text-white">
              A
            </span>

          </div>

        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          AMX Enterprise ERP
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Secure cloud ERP management system
        </p>

        {/* EMAIL INPUT */}
        <div className="relative mb-5">

          <Mail
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* PASSWORD INPUT */}
        <div className="relative mb-3">

          <LockKeyhole
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* REMEMBER */}
        <div className="flex items-center justify-between mb-6">

          <label className="flex items-center gap-2 text-sm text-gray-600">

            <input type="checkbox" />

            Remember me
          </label>

          <button className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </button>

        </div>

        {/* LOGIN BUTTON */}
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-200 shadow-lg disabled:opacity-70"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Enterprise-grade secure access
        </p>

      </div>
    </div>
  );
}