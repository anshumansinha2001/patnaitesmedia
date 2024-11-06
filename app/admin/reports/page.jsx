"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import Image from "next/image";
import Link from "next/link";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/api/report");
        if (response.data.success) {
          setReports(response.data.reports);
        } else {
          toast.error("Failed to load reports");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        toast.error("Error loading reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Delete report function
  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      setLoading(true);
      await axios.delete(`/api/report?id=${id}`); // API endpoint to delete ad by id
      setLoading(false);
      toast.info("Report deleted successfully!");
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Error deleting report");
    }
  };

  // Store Report ID to session storage
  const storeReportId = (id) => {
    const reportId = sessionStorage.getItem("reportId");
    if (reportId) {
      sessionStorage.removeItem("reportId");
    }
    sessionStorage.setItem("reportId", id);
  };

  if (loading) {
    return <LoadingAdmin />;
  }

  if (reports.length === 0)
    return (
      <div className="text-2xl font-semibold flex justify-center items-center h-[80vh] text-gray-800">
        Nobody has Reported yet!
      </div>
    );

  return (
    <div className="max-h-screen px-0 md:px-28 mx-auto overflow-auto">
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">
        All Reports
      </h1>

      <div className="flex flex-wrap">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white max-w-[400px] rounded-lg shadow-md m-2 md:m-4 p-2 md:p-4"
          >
            <h2 className="text-xl font-semibold mb-2">
              {report.articleTitle}
            </h2>
            <Link href={`/admin/update-news/${report.articleSlug}`}>
              <Image
                onClick={() => storeReportId(report._id)}
                className="hover:scale-95 transition duration-300 ease-in-out"
                src={report.articleImage}
                width={400}
                height={400}
                alt={report.articleTitle}
              />
            </Link>
            <p className="text-gray-600 mt-2">
              <span className="font-bold">Reason:</span> {report.reason}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Description:</span>{" "}
              {report.description || "No description provided"}
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={() => deleteReport(report._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
