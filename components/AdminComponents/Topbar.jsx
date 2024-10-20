"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaList, FaPlus } from "react-icons/fa";
import { MdContactMail, MdReportProblem, MdUnsubscribe } from "react-icons/md";

const Topbar = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function handleLogout() {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div className="flex sm:hidden flex-col bg-slate-100 w-full shadow-md p-4">
      <nav className="flex justify-between items-center">
        <Link href="/admin" className="text-2xl font-semibold">
          Admin Panel
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      <section className={`${open ? "block" : "hidden"}`}>
        <div className="flex flex-col mt-4 space-y-2 text-lg">
          <Link
            onClick={() => setOpen(!open)}
            href="/admin/news-list"
            className="flex justify-start items-center gap-2 hover:text-gray-900"
          >
            <FaList />
            News List
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            href="/admin/create-news"
            className="flex justify-start items-center gap-2 hover:text-gray-900"
          >
            <FaPlus />
            Add News
          </Link>

          <Link
            onClick={() => setOpen(!open)}
            href="/admin/contacts"
            className="flex justify-start items-center gap-2 hover:text-gray-900"
          >
            <MdContactMail />
            Contacts
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            href="/admin/reports"
            className="flex justify-start items-center gap-2 hover:text-gray-900"
          >
            <MdReportProblem />
            Reports
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            href="/admin/subscribers"
            className="flex justify-start items-center gap-2 hover:text-gray-900"
          >
            <MdUnsubscribe /> Subscribers
          </Link>
          <button
            onClick={() => router.push("/")}
            className="text-sm font-medium bg-black text-white py-2 px-4 rounded"
          >
            Return Home
          </button>
          <button
            onClick={handleLogout}
            className="text-sm font-medium bg-black text-white py-2 px-4 rounded"
          >
            Log Out
          </button>
        </div>
      </section>
    </div>
  );
};

export default Topbar;
