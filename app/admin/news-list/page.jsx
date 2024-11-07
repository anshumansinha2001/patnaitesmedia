"use client";

import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import NewsTableItem from "@/components/AdminComponents/NewsTableItem";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("All");
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

  // Filter articles based on selected category
  const filteredArticles = useMemo(
    () =>
      category === "All"
        ? articles
        : articles.filter((article) => article.category === category),
    [category, articles]
  );

  // Delete article
  const deleteArticle = async (articleId) => {
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
      <h1 className="text-2xl md:text-3xl font-medium md:font-bold text-center">
        All News ({articles.length})
      </h1>

      {/* Filter Option */}
      <div className="flex w-fit my-2 rounded-md bg-black">
        <div className="p-2">
          <FaFilter className="text-white h-4 w-4" />
        </div>
        <select
          className="bg-black text-white px-2 py-1 rounded-md outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          {
            // Create a Set to hold unique categories
            Array.from(
              new Set(articles.map((article) => article.category))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))
          }
        </select>
      </div>

      <div className="relative max-h-[80vh] max-w-[100%] overflow-x-auto mt-4 shadow-lg rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-200 sticky top-0 z-30">
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

          <tbody className="">
            {filteredArticles.map((article) => (
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
