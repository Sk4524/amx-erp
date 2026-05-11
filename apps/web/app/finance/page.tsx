"use client";

import Sidebar from "../../components/Sidebar";
import AuthGuard from "../../components/AuthGuard";

import { useEffect, useState } from "react";

import api from "../../lib/api";

export default function FinancePage() {

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [accounts, setAccounts] =
    useState<any[]>([]);

  const [amount, setAmount] = useState("");

  const [type, setType] = useState("EXPENSE");

  const [accountId, setAccountId] = useState("");

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  // LOAD ROLE
  useEffect(() => {

    const savedRole =
      localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }

  }, []);

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const res = await api.get(
        `/finance/transactions?search=${search}`
      );

      setTransactions(
        res.data.data || []
      );

    } catch (err) {

      console.log(err);

      setTransactions([]);
    }
  };

  // FETCH ACCOUNTS
  const fetchAccounts = async () => {

    try {

      const res = await api.get(
        "/finance/accounts"
      );

      setAccounts(
        res.data.data || []
      );

    } catch (err) {

      console.log(err);

      setAccounts([]);
    }
  };

  // INITIAL LOAD
  useEffect(() => {

    fetchTransactions();

    fetchAccounts();

  }, [search]);

  // CREATE TRANSACTION
  const createTransaction = async () => {

    try {

      await api.post(
        "/finance/transactions",
        {
          amount: Number(amount),
          type,
          accountId,
        }
      );

      setAmount("");

      fetchTransactions();

      alert("Transaction Added ✅");

    } catch (err: any) {

      console.log(err);

      alert(
        JSON.stringify(
          err?.response?.data ||
          "Transaction Failed"
        )
      );
    }
  };

  // DELETE TRANSACTION
  const deleteTransaction = async (
    id: string
  ) => {

    try {

      await api.delete(
        `/finance/transactions/${id}`
      );

      fetchTransactions();

      alert("Deleted ✅");

    } catch (err) {

      console.log(err);
    }
  };

  // ANALYTICS
  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((a, b) => a + b.amount, 0);

  return (

    <AuthGuard>

      <div className="flex">

        <Sidebar />

        <div className="p-10 w-full ml-72 bg-gray-100 min-h-screen text-black">

          {/* TOP */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-4xl font-bold">
                Finance
              </h1>

              <p className="text-gray-500 mt-1">
                Manage accounts and transactions
              </p>

            </div>

            <input
              placeholder="Search transaction..."
              className="border p-3 rounded-xl w-[320px] bg-white"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* ANALYTICS */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-2xl p-6 shadow">

              <p className="text-gray-500">
                Total Income
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                ₹{income}
              </h2>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow">

              <p className="text-gray-500">
                Total Expense
              </p>

              <h2 className="text-3xl font-bold text-red-500 mt-2">
                ₹{expense}
              </h2>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow">

              <p className="text-gray-500">
                Net Balance
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                ₹{income - expense}
              </h2>

            </div>

          </div>

          {/* ADMIN FORM */}
          {role === "ADMIN" && (

            <div className="bg-white rounded-2xl p-6 shadow mb-8">

              <h2 className="text-2xl font-semibold mb-5">
                Add Transaction
              </h2>

              <div className="grid grid-cols-3 gap-4">

                <input
                  type="number"
                  placeholder="Amount"
                  className="p-3 border rounded-xl"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                />

                <select
                  className="p-3 border rounded-xl"
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value)
                  }
                >

                  <option value="EXPENSE">
                    EXPENSE
                  </option>

                  <option value="INCOME">
                    INCOME
                  </option>

                </select>

                <select
                  className="p-3 border rounded-xl"
                  value={accountId}
                  onChange={(e) =>
                    setAccountId(e.target.value)
                  }
                >

                  <option value="">
                    Select Account
                  </option>

                  {accounts.map((acc) => (

                    <option
                      key={acc.id}
                      value={acc.id}
                    >
                      {acc.name}
                    </option>

                  ))}

                </select>

              </div>

              <button
                onClick={createTransaction}
                className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Add Transaction
              </button>

            </div>

          )}

          {/* TABLE */}
          <div className="bg-white rounded-2xl p-6 shadow">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-semibold">
                Transactions
              </h2>

              <div className="text-sm text-gray-500">
                Total: {transactions.length}
              </div>

            </div>

            {/* HEADER */}
            <div className="grid grid-cols-4 border-b pb-3 font-semibold text-gray-500">

              <div>Type</div>
              <div>Amount</div>
              <div>Account</div>
              <div>Actions</div>

            </div>

            {/* BODY */}
            {transactions.length === 0 ? (

              <p className="py-6 text-gray-500">
                No transactions found
              </p>

            ) : (

              transactions.map((tx: any) => (

                <div
                  key={tx.id}
                  className="grid grid-cols-4 py-4 border-b items-center hover:bg-gray-50 px-2 rounded-lg"
                >

                  <div
                    className={
                      tx.type === "INCOME"
                        ? "text-green-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {tx.type}
                  </div>

                  <div>
                    ₹{tx.amount}
                  </div>

                  <div>
                    {tx.account?.name}
                  </div>

                  <div>

                    {role === "ADMIN" ? (

                      <button
                        className="text-red-500"
                        onClick={() =>
                          deleteTransaction(tx.id)
                        }
                      >
                        Delete
                      </button>

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