"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RevenueChart from "../components/RevenueChart";

import {
  Users,
  IndianRupee,
  Package
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : "";

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:3000/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="w-full ml-72">

        <Navbar />

        <div className="p-8">

          {/* CARDS */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            {/* EMPLOYEE */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Employees
                  </p>

                  <h2 className="text-4xl font-bold text-gray-800 mt-2">
                    {employees.length}
                  </h2>
                </div>

                <div className="bg-blue-100 p-4 rounded-xl">
                  <Users className="text-blue-600" />
                </div>

              </div>
            </div>

            {/* REVENUE */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Monthly Revenue
                  </p>

                  <h2 className="text-4xl font-bold text-green-600 mt-2">
                    ₹1.2L
                  </h2>
                </div>

                <div className="bg-green-100 p-4 rounded-xl">
                  <IndianRupee className="text-green-600" />
                </div>

              </div>
            </div>

            {/* INVENTORY */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Inventory Items
                  </p>

                  <h2 className="text-4xl font-bold text-purple-600 mt-2">
                    50
                  </h2>
                </div>

                <div className="bg-purple-100 p-4 rounded-xl">
                  <Package className="text-purple-600" />
                </div>

              </div>
            </div>

          </div>

          {/* EMPLOYEE LIST */}
  <div className="grid grid-cols-3 gap-6">

  {/* CHART */}
  <div className="col-span-2">
    <RevenueChart />
  </div>

  {/* QUICK STATS */}
  <div className="bg-white rounded-2xl p-6 shadow-sm">

    <h2 className="text-xl font-bold text-gray-800 mb-6">
      Quick Stats
    </h2>

    <div className="space-y-5">

      <div className="border rounded-xl p-4">
        <p className="text-sm text-gray-500">
          Active Employees
        </p>

        <h2 className="text-2xl font-bold text-blue-600">
          {employees.length}
        </h2>
      </div>

      <div className="border rounded-xl p-4">
        <p className="text-sm text-gray-500">
          Pending Tasks
        </p>

        <h2 className="text-2xl font-bold text-orange-500">
          12
        </h2>
      </div>

      <div className="border rounded-xl p-4">
        <p className="text-sm text-gray-500">
          System Status
        </p>

        <h2 className="text-2xl font-bold text-green-600">
          Healthy
        </h2>
      </div>

    </div>

  </div>

</div>

{/* EMPLOYEE TABLE */}
<div className="bg-white rounded-2xl p-8 shadow-sm mt-8">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-2xl font-bold text-gray-800">
      Employees Overview
    </h2>

    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
      Manage Employees
    </button>

  </div>

  {/* TABLE HEADER */}
  <div className="grid grid-cols-3 border-b pb-3 text-gray-500 font-semibold">

    <div>Name</div>
    <div>Position</div>
    <div>Salary</div>

  </div>

  {/* TABLE BODY */}
  <div className="mt-3">

    {employees.length === 0 ? (
      <p className="text-gray-500 py-4">
        No employees found
      </p>
    ) : (
      employees.map((emp: any) => (
        <div
          key={emp.id}
          className="grid grid-cols-3 py-4 border-b hover:bg-gray-50 transition rounded-lg px-2"
        >
          <div className="font-medium text-gray-800">
            {emp.name}
          </div>

          <div className="text-gray-600">
            {emp.position}
          </div>

          <div className="font-semibold text-green-600">
            ₹{emp.salary}
          </div>
        </div>
      ))
    )}

  </div>

</div>

        </div>

      </div>

    </div>

  )
};