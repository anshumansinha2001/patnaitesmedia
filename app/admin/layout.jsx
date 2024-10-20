"use client";
import Sidebar from "@/components/AdminComponents/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import Topbar from "@/components/AdminComponents/Topbar";

export default function AdminLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("cache"));

    if (isAuthenticated?.length !== 666) {
      setIsAdmin(false);
      router.push("/admin-login");
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  return (
    <>
      {isAdmin ? (
        <div className="block md:flex">
          <ToastContainer theme="dark" position="top-right" />

          <div className="flex md:hidden">
            <Topbar />
          </div>

          <div className="hidden md:block">
            <Sidebar />
          </div>

          <div className="flex flex-col w-full">{children}</div>
        </div>
      ) : (
        <LoadingAdmin />
      )}
    </>
  );
}
