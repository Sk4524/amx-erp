"use client";

import Sidebar from "../components/Sidebar";
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
    <div className="flex">

      <Sidebar />

      <div className="p-10 w-full bg-gray-100 min-h-screen text-black">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Employees</h2>
            <p className="text-3xl font-bold text-black">
              {employees.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Revenue</h2>
            <p className="text-3xl font-bold text-green-600">
              ₹1,20,000
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Inventory</h2>
            <p className="text-3xl font-bold text-blue-600">
              50 Items
            </p>
          </div>

        </div>

        {/* EMPLOYEE LIST */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Employees List
          </h2>

          {employees.length === 0 ? (
            <p className="text-gray-500">No employees found</p>
          ) : (
            employees.map((emp: any) => (
              <div key={emp.id} className="border-b py-2">
                <span className="font-medium">{emp.name}</span> -{" "}
                {emp.position}
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}