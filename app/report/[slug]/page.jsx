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
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
          { params: { slug: params.slug } }
        );
        setArticle(data.article);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "/api/report",
        {
          articleSlug: article.slug,
          articleImage: article.image,
          articleTitle: article.title,
          reason,
          description,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Report submitted successfully");
        setSubmitted(true);
      } else {
        toast.error(response.data.message || "Error submitting report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!article)
    return (
      <p className="text-center text-3xl h-screen flex items-center justify-center">
        Loading article details...
      </p>
    );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl mx-auto p-5 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Report an Issue</h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Image
            src={article.image}
            alt={article.title}
            width={200}
            height={200}
            className="rounded-md"
          />
          <h2 className="text-xl font-semibold">{article.title}</h2>
        </div>

        {submitted ? (
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
                className="mt-1 block w-full p-2 border rounded-md"
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
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              {isSubmitting ? "Sending..." : "Submit Report"}
            </button>
          </form>
        )}
        <Link
          href="/"
          className="mt-2 inline-block bg-black text-white py-2 px-4 rounded text-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Report;
