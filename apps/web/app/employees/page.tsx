"use client";

import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : "";

  // FETCH EMPLOYEES
  const fetchEmployees = () => {
    axios
      .get("http://localhost:3000/employee", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token) fetchEmployees();
  }, []);

  // ADD EMPLOYEE
  const addEmployee = async () => {
    await axios.post(
      "http://localhost:3000/employee",
      {
        name,
        position,
        salary: Number(salary),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setName("");
    setPosition("");
    setSalary("");

    fetchEmployees();
  };

  // DELETE EMPLOYEE (frontend only for now)
 const deleteEmployee = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3000/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchEmployees();

  } catch (err) {
    console.log(err);
    alert("Delete failed ❌");
  }
};
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-10 w-full bg-gray-100 min-h-screen text-black">
        <h1 className="text-3xl font-bold mb-6">Employees</h1>

        {/* ADD FORM */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Employee</h2>

          <div className="grid grid-cols-3 gap-4">
            <input
              placeholder="Name"
              className="p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Position"
              className="p-2 border rounded"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />

            <input
              placeholder="Salary"
              className="p-2 border rounded"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <button
            onClick={addEmployee}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
          >
            Add Employee
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Employee List</h2>

          {employees.map((emp: any) => (
            <div
              key={emp.id}
              className="flex justify-between border-b py-2"
            >
              <div>
                <b>{emp.name}</b> - {emp.position} (₹{emp.salary})
              </div>

              <button
                onClick={() => deleteEmployee(emp.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}