"use client";

import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import NewsTableItem from "@/components/AdminComponents/NewsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/article");

      setLoading(false);
      setArticles(response.data.articles);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching news:", error); // Handle error
    }
  };

  // Delete article
  const deleteArticle = async (articleId) => {
    console.log("Deleting article with ID:", articleId);

    // Confirmation prompt
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!userConfirmed) {
      return; // Exit if the user cancels the deletion
    }

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/article`, {
        params: { id: articleId },
      });
      toast.info("Article deleted successfully!");
      fetchNews();
    } catch (error) {
      toast.error("Failed to delete article.");
      console.error("Error deleting article:", error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <LoadingAdmin />;
  }

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-xl md:text-3xl font-medium md:font-bold">All News</h1>
      <div className="relative h-[100vh] max-w-[100%] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <NewsTableItem
                key={article._id}
                {...article}
                deleteArticle={deleteArticle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
