import Link from "next/link";
import React from "react";

const AdminAdsSidebar = () => {
  return (
    <div className="flex justify-center items-center w-40  mx-4">
      <div className="flex flex-col gap-5 bg-gray-100 p-3 border border-black">
        <div className="flex flex-col text-center gap-2">
          <p className="underline underline-offset-2">Between Ads</p>
          <Link
            href="/admin/ads/between-ads/create"
            className="border bg-black text-white rounded-lg hover:bg-gray-800 font-medium px-3 py-2"
          >
            Create New
          </Link>
          <Link
            href="/admin/ads/between-ads"
            className="border bg-black text-white rounded-lg hover:bg-gray-800 font-medium px-3 py-2"
          >
            Update/Delete
          </Link>
        </div>
        <hr className="w-full" />
        <div className="flex flex-col text-center gap-2">
          <p className="underline underline-offset-2">Bottom Ads</p>
          <Link
            href="/admin/ads/bottom-ads/create"
            className="border bg-black text-white rounded-lg hover:bg-gray-800 font-medium px-3 py-2"
          >
            Create New
          </Link>
          <Link
            href="/admin/ads/bottom-ads"
            className="border bg-black text-white rounded-lg hover:bg-gray-800 font-medium px-3 py-2"
          >
            Update/Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminAdsSidebar;
