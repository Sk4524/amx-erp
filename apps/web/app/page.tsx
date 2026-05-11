"use client";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RevenueChart from "../components/RevenueChart";
import AuthGuard from "../components/AuthGuard";

import {
  Users,
  IndianRupee,
  Package
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "../lib/api";

export default function Home() {

  const router = useRouter();

  const [employees, setEmployees] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // TOKEN
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

    try {

      const res = await api.get(
        "/employee"
      );

      console.log(res.data);
      console.log("TOKEN:", token);
console.log("EMPLOYEE DATA:", res.data);

      // IMPORTANT FIX
      setEmployees(
  Array.isArray(res.data)
    ? res.data
    : res.data.data || []
);


    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (!token) {

      router.push("/login");
      return;
    }

    fetchEmployees();

  }, []);

  return (
    <AuthGuard>

    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="w-full ml-72">

        <Navbar />

        <div className="p-8">

          {/* PAGE TITLE */}
          <div className="mb-8">

            <h1 className="text-5xl font-bold text-gray-800">
              Enterprise Dashboard
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Welcome back to AMX ERP
            </p>

          </div>

          {/* TOP CARDS */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            {/* EMPLOYEES */}
            <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition duration-300">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Employees
                  </p>

                  <h2 className="text-5xl font-bold text-gray-800 mt-3">
                    {employees.length}
                  </h2>

                </div>

                <div className="bg-blue-100 p-5 rounded-2xl">

                  <Users
                    size={34}
                    className="text-blue-600"
                  />

                </div>

              </div>

            </div>

            {/* REVENUE */}
            <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition duration-300">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Monthly Revenue
                  </p>

                  <h2 className="text-5xl font-bold text-green-600 mt-3">
                    ₹1.2L
                  </h2>

                </div>

                <div className="bg-green-100 p-5 rounded-2xl">

                  <IndianRupee
                    size={34}
                    className="text-green-600"
                  />

                </div>

              </div>

            </div>

            {/* INVENTORY */}
            <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition duration-300">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Inventory Items
                  </p>

                  <h2 className="text-5xl font-bold text-purple-600 mt-3">
                    50
                  </h2>

                </div>

                <div className="bg-purple-100 p-5 rounded-2xl">

                  <Package
                    size={34}
                    className="text-purple-600"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* CHART + STATS */}
          <div className="grid grid-cols-3 gap-6">

            {/* CHART */}
            <div className="col-span-2">

              <RevenueChart />

            </div>

            {/* QUICK STATS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Quick Stats
              </h2>

              <div className="space-y-5">

                <div className="border rounded-2xl p-5">

                  <p className="text-gray-500 text-sm">
                    Active Employees
                  </p>

                  <h2 className="text-4xl font-bold text-blue-600 mt-2">
                    {employees.length}
                  </h2>

                </div>

                <div className="border rounded-2xl p-5">

                  <p className="text-gray-500 text-sm">
                    Pending Tasks
                  </p>

                  <h2 className="text-4xl font-bold text-orange-500 mt-2">
                    12
                  </h2>

                </div>

                <div className="border rounded-2xl p-5">

                  <p className="text-gray-500 text-sm">
                    System Status
                  </p>

                  <h2 className="text-4xl font-bold text-green-600 mt-2">
                    Healthy
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* EMPLOYEE OVERVIEW */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mt-8">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">
                  Employees Overview
                </h2>

                <p className="text-gray-500 mt-1">
                  Recently added employees
                </p>

              </div>

              {/* BUTTON FIX */}
              <button
                onClick={() => router.push("/employees")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Manage Employees
              </button>

            </div>

            {/* HEADER */}
            <div className="grid grid-cols-3 border-b pb-4 text-gray-500 font-semibold">

              <div>Name</div>
              <div>Position</div>
              <div>Salary</div>

            </div>

            {/* BODY */}
            <div className="mt-3">

              {loading ? (

                <p className="py-5 text-gray-500">
                  Loading employees...
                </p>

              ) : employees.length === 0 ? (

                <p className="py-5 text-gray-500">
                  No employees found
                </p>

              ) : (

                employees.map((emp: any) => (

                  <div
                    key={emp.id}
                    className="grid grid-cols-3 py-4 border-b hover:bg-gray-50 rounded-xl px-3 transition"
                  >

                    <div className="font-medium text-gray-800">
                      {emp.name}
                    </div>

                    <div className="text-gray-600">
                      {emp.position}
                    </div>

                    <div className="font-bold text-green-600">
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
    </AuthGuard>

  );
}