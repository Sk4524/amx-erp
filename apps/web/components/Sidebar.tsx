"use client";

import {
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-64 h-screen bg-[#0f172a] text-white p-5 flex flex-col justify-between">

      {/* TOP */}
      <div>
        <h2 className="text-2xl font-bold mb-8 tracking-wide">
          AMX ERP
        </h2>

        <div className="space-y-5 text-gray-300">

          {/* Dashboard */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:text-white transition"
            onClick={() => router.push("/")}
          >
            <LayoutDashboard size={20} /> Dashboard
          </div>

          {/* Employees */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:text-white transition"
            onClick={() => router.push("/employees")}
          >
            <Users size={20} /> Employees
          </div>

          {/* Inventory */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:text-white transition"
          >
            <Package size={20} /> Inventory
          </div>

          {/* Finance */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:text-white transition"
          >
            <DollarSign size={20} /> Finance
          </div>

        </div>
      </div>

      {/* LOGOUT */}
      <div
        className="flex items-center gap-3 cursor-pointer text-red-400 hover:text-red-300 transition"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
      >
        <LogOut size={20} /> Logout
      </div>

    </div>
  );
}