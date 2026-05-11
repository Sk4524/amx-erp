"use client";

import Sidebar from "../../components/Sidebar";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import AuthGuard from "../../components/AuthGuard";

export default function EmployeesPage() {

  const [employees, setEmployees] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  const [editingId, setEditingId] = useState("");

  const [search, setSearch] = useState("");

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await api.get(
        `http://localhost:3002/employee?search=${search}`,
        
      );

      setEmployees(res.data.data || []);

    } catch (err) {

      console.log(err);

      setEmployees([]);
    }
  };

  // INITIAL LOAD
  useEffect(() => {

    fetchEmployees();

  }, [search]);

  // ADD EMPLOYEE
  const addEmployee = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "http://localhost:3002/employee",
        {
          name,
          position,
          salary: Number(salary),
        },
        
      );

      setName("");
      setPosition("");
      setSalary("");

      fetchEmployees();

      alert("Employee Added ✅");

    } catch (err: any) {

      console.log(err);

      alert(
        JSON.stringify(
          err?.response?.data || "Add Employee Failed"
        )
      );
    }
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (id: string) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(
        `http://localhost:3002/employee/${id}`,
        
      );

      fetchEmployees();

    } catch (err) {

      console.log(err);
    }
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.put(
        `http://localhost:3002/employee/${editingId}`,
        {
          name,
          position,
          salary: Number(salary),
        },
        
      );

      setEditingId("");

      setName("");
      setPosition("");
      setSalary("");

      fetchEmployees();

      alert("Employee Updated ✅");

    } catch (err: any) {

      console.log(err);

      alert(
        JSON.stringify(
          err?.response?.data || "Update Failed"
        )
      );
    }
  };

  return (
    <AuthGuard>
    <div className="flex">

      <Sidebar />

      <div className="p-10 w-full ml-72 bg-gray-100 min-h-screen text-black">

        {/* TOP */}
        <div className="flex items-center justify-between mb-6">

          <h1 className="text-3xl font-bold">
            Employees
          </h1>

          <input
            placeholder="Search employee..."
            className="border p-3 rounded-xl w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <h2 className="text-xl font-semibold mb-5">

            {editingId
              ? "Update Employee"
              : "Add Employee"}

          </h2>

          <div className="grid grid-cols-3 gap-4">

            <input
              placeholder="Employee Name"
              className="p-3 border rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Position"
              className="p-3 border rounded-xl"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />

            <input
              placeholder="Salary"
              type="number"
              className="p-3 border rounded-xl"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

          </div>

          <button
            onClick={
              editingId
                ? updateEmployee
                : addEmployee
            }
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >

            {editingId
              ? "Update Employee"
              : "Add Employee"}

          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-5">
            Employees List
          </h2>

          {/* HEADER */}
          <div className="grid grid-cols-4 border-b pb-3 font-semibold text-gray-500">

            <div>Name</div>
            <div>Position</div>
            <div>Salary</div>
            <div>Actions</div>

          </div>

          {/* BODY */}
          {employees.length === 0 ? (

            <p className="py-6 text-gray-500">
              No employees found
            </p>

          ) : (

            employees.map((emp: any) => (

              <div
                key={emp.id}
                className="grid grid-cols-4 py-4 border-b items-center hover:bg-gray-50 px-2 rounded-lg"
              >

                <div className="font-medium">
                  {emp.name}
                </div>

                <div>
                  {emp.position}
                </div>

                <div className="text-green-600 font-semibold">
                  ₹{emp.salary}
                </div>

                <div className="flex gap-4">

                  <button
                    onClick={() => {

                      setEditingId(emp.id);

                      setName(emp.name);

                      setPosition(emp.position);

                      setSalary(emp.salary.toString());
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
    </AuthGuard>
  );
}