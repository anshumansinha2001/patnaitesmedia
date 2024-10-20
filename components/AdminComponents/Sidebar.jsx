import Link from "next/link";
import React from "react";

const Sidebar = () => {
  function handleLogout() {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col bg-slate-100">
      <div className="text-center py-3 border border-black">
        <Link
          href="/admin"
          className="text-lg md:text-2xl font-medium text-black font-serif tracking-widest uppercase 
     hover:cursor-pointer"
        >
          Patnaites News
        </Link>
        <div>Admin Panel</div>
      </div>

      <div className="w-28 sm:w-80 h-screen relative py-12 border border-black">
        <div className="flex flex-col gap-5 w-[50%] sm:w-[80%] absolute right-0 ">
          <Link
            href="/admin/create-news"
            className="flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <p>Add News</p>
          </Link>
          <Link
            href="/admin/news-list"
            className="flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <p>News List</p>
          </Link>

          <Link
            href="/admin/contacts"
            className="flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <p>Contacts</p>
          </Link>
          <Link
            href="/admin/reports"
            className="flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <p>Reports</p>
          </Link>
          <Link
            href="/admin/subscribers"
            className="flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#ff0000]"
          >
            <p>Subscribers</p>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <p>Return Home</p>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <p>Log Out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
