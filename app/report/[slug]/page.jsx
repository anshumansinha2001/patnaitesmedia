"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

const Report = ({ params }) => {
  const [article, setArticle] = useState(null);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
          {
            params: { slug: params.slug },
          }
        );
        const data = response.data.article;

        if (!data) {
          throw new Error("Article not found");
        }
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to submit the report to your backend
    try {
      const formData = new FormData();
      formData.append("reason", reason);
      formData.append("description", description);
      formData.append("slug", params.slug);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/report`,
        {
          formData,
        }
      );

      if (response.data.success) {
        toast.success("Report submitted successfully");
        console.log("Report submitted successfully");
      }

      if (response.data.error) {
        toast.error(response.data.error || "Error submitting report");
        console.error("Error submitting report:", response.data.error);
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  if (!article) {
    return (
      <p className="text-center text-3xl flex justify-center items-center h-screen">
        Loading article details...
      </p>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 ">
      <div className="max-w-3xl mx-auto p-5 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Report an Issue</h1>
        <div className="flex flex-col md:flex-row items-center justify-center my-4 gap-4">
          <Image
            src={article.image}
            alt={article.title}
            width={200}
            height={200}
            className="rounded-md mr-4"
          />
          <h2 className="text-xl font-semibold">{article.title}</h2>
        </div>

        {success ? (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
            Thank you for your feedback. We will review your report shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Reason for Reporting
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select a reason</option>
                <option value="Inappropriate content">
                  Inappropriate content
                </option>
                <option value="Spam">Spam</option>
                <option value="Misleading information">
                  Misleading information
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Comments (optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Submit Report
            </button>
          </form>
        )}
        <div className="mt-2 max-w-[10rem] text-center bg-black hover:bg-gray-700 text-white font-semibold text-sm py-2 px-4 rounded">
          <Link href="/">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Report;
