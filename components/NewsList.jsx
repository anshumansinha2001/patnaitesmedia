import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsList = () => {
  const [menu, setMenu] = useState("All");
  const [isSticky, setIsSticky] = useState(false);
  const [aticles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/article");
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Extract unique categories from blog_data
  const categories = [
    "All",
    ...new Set(aticles.map((article) => article.category)),
  ];

  // Adding an effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const handleMenuChange = (newMenu) => {
    setMenu(newMenu);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling effect
    });
  };

  return (
    <div>
      {/* for Categories List */}
      <div
        className={`${
          isSticky ? "shadow-lg" : ""
        } transition-shadow duration-300 sticky top-0 flex justify-start md:justify-center gap-6 my-6 p-2 md:p-4 bg-white z-10 overflow-y-auto`}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleMenuChange(category)}
            className={
              menu === category
                ? "bg-[#ff0000] text-white py-1 px-4 rounded-sm"
                : undefined
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* for news cards */}
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24 min-h-[300px]">
        {aticles.filter((article) =>
          menu === "All" ? true : article.category === menu
        ).length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className="loading-spinner"></p>
            <p>Loading...</p>
          </div>
        ) : (
          aticles
            .filter((article) =>
              menu === "All" ? true : article.category === menu
            )
            .map((article) => <NewsCard key={article._id} {...article} />)
        )}
      </div>
    </div>
  );
};

export default NewsList;
