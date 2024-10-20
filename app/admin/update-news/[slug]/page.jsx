"use client";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import PostPage from "@/components/AdminComponents/PostForm";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const UpdatePage = ({ params }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
        {
          params: { slug: params.slug },
        }
      );
      setArticles(response.data.article);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (loading) {
    return <LoadingAdmin />;
  }
  return <PostPage post={articles} />;
};

export default UpdatePage;
