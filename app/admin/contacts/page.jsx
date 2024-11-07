"use client";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
        if (response.data.success) {
          setContacts(response.data.contacts);
        } else {
          toast.error("Failed to load contacts");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Error loading contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Delete contact function
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      setLoading(true);
      await axios.delete(`/api/contact?id=${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.info("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAdmin />;

  if (contacts.length === 0)
    return (
      <div className="text-2xl font-semibold flex justify-center items-center h-[80vh] text-gray-800">
        Nobody has contacted yet!
      </div>
    );

  return (
    <div className="h-screen px-0 md:px-28 mx-auto overflow-x-auto">
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">
        Contacts ({contacts.length})
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {contact.name}
              </h2>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="mt-4 text-gray-700">{contact.message}</p>
            </div>
            <button
              onClick={() => deleteContact(contact._id)}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;
