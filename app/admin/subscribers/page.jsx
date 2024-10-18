"use client";

import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  // Fetch email by axios
  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // delete email
  const deleteEmail = async (emailId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this email?"
    );

    if (!userConfirmed) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/email`, {
        params: { id: emailId },
      });
      fetchEmails();
      toast.success("Email deleted successfully");
    } catch (error) {
      toast.error("Failed to delete email");
      console.error("Error deleting email:", error);
    }
  };

  return (
    <div className="flex-1 pt-5 sm:pt-12 sm:pl-16">
      <h1 className="text-3xl font-bold">All Subscribers</h1>

      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="px-6 py-3">
                Data
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {emails.map((email) => (
              <SubsTableItem
                key={email._id}
                {...email}
                deleteEmail={deleteEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
