"use client";

import Sidebar from "../../components/Sidebar";
import AuthGuard from "../../components/AuthGuard";

import { useEffect, useState } from "react";

import api from "../../lib/api";

export default function EmployeesPage() {

  const [employees, setEmployees] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  const [editingId, setEditingId] = useState("");

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  // LOAD ROLE
  useEffect(() => {

    const savedRole = localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }

  }, []);

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

  try {

    const res = await api.get(
      `/employee?search=${search}`
    );

    console.log("EMPLOYEE SEARCH:", res.data);

    setEmployees(
      res.data.data || []
    );

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

      await api.post(
        "/employee",
        {
          name,
          position,
          salary: Number(salary),
        }
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

      await api.delete(
        `/employee/${id}`
      );

      fetchEmployees();

      alert("Employee Deleted ✅");

    } catch (err: any) {

      console.log(err);

      alert(
        JSON.stringify(
          err?.response?.data || "Delete Failed"
        )
      );
    }
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async () => {

    try {

      await api.put(
        `/employee/${editingId}`,
        {
          name,
          position,
          salary: Number(salary),
        }
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
          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-4xl font-bold text-gray-800">
                Employees
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your organization employees
              </p>

            </div>

            <input
              placeholder="Search employee..."
              className="border p-3 rounded-xl w-[320px] bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* ADMIN FORM */}
          {role === "ADMIN" && (

            <div className="bg-white p-6 rounded-2xl shadow mb-8">

              <h2 className="text-2xl font-semibold mb-5">

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

          )}

          {/* TABLE */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-semibold">
                Employees List
              </h2>

              <div className="text-sm text-gray-500">
                Total: {employees.length}
              </div>

            </div>

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
                  className="grid grid-cols-4 py-4 border-b items-center hover:bg-gray-50 px-2 rounded-lg transition"
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

                  <div>

                    {role === "ADMIN" ? (

                      <div className="flex gap-4">

                        <button
                          onClick={() => {

                            setEditingId(emp.id);

                            setName(emp.name);

                            setPosition(emp.position);

                            setSalary(
                              emp.salary.toString()
                            );
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteEmployee(emp.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    ) : (

                      <span className="text-gray-400 text-sm">
                        View Only
                      </span>

                    )}

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