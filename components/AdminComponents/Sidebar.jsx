import Link from "next/link";
import React from "react";
import { FaHome, FaList } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaCloudArrowUp, FaPlus } from "react-icons/fa6";
import { MdContactMail, MdReportProblem, MdUnsubscribe } from "react-icons/md";

const Sidebar = () => {
  function handleLogout() {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col w-80 h-screen border border-black bg-slate-100">
      <div className="text-center py-3  border-b border-black">
        <Link
          href="/admin"
          className="text-lg md:text-2xl font-medium font-serif tracking-widest uppercase 
     hover:cursor-pointer"
        >
          Patnaites News
        </Link>
        <div>Admin Panel</div>
      </div>

      <div className="relative">
        <div className="flex flex-col gap-5 w-[50%] sm:w-[80%] absolute right-0 py-12">
          <Link
            href="/admin/news-list"
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <FaList size={20} />
            News List
          </Link>
          <Link
            href="/admin/create-news"
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <FaPlus size={20} />
            Add News
          </Link>
          <Link
            href="/admin/ads"
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <FaCloudArrowUp size={20} />
            Promotions
          </Link>
          <Link
            href="/admin/contacts"
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <MdContactMail size={20} />
            Contacts
          </Link>
          <Link
            href="/admin/reports"
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <MdReportProblem size={20} />
            Reports
          </Link>
          <Link
            href="/admin/subscribers"
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <MdUnsubscribe size={20} /> Subscribers
          </Link>
          <Link
            href="/"
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <FaHome size={20} />
            Return Home
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-start border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <RiLogoutCircleLine size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
