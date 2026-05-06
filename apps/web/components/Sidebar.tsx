"use client";

import {
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  LogOut
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/"
    },
    {
      label: "Employees",
      icon: Users,
      path: "/employees"
    },
    {
      label: "Inventory",
      icon: Package,
      path: "/inventory"
    },
    {
      label: "Finance",
      icon: DollarSign,
      path: "/finance"
    }
  ];

  return (
    <div className=" fixed left-0 top-0 w-72 h-screen bg-[#0b1120] text-white flex flex-col justify-between shadow-2xl">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="px-8 py-7 border-b border-gray-800">

          <h1 className="text-3xl font-bold tracking-wide text-blue-500">
            AMX ERP
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Enterprise Suite
          </p>

        </div>

        {/* MENU */}
        <div className="px-4 py-6 space-y-3">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                onClick={() => router.push(item.path)}
                className={clsx(
                  "flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200",
                  pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.label}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* FOOTER */}
      <div className="p-5 border-t border-gray-800">

        <div
          className="flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </div>

      </div>
    </div>
  );
}