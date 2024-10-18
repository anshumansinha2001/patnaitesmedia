"use client";
import { assets } from "@/assets/assets";
import RTE from "@/components/AdminComponents/RTE";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Politics",
    slug: "",
    author: "Patnaites",
  });

  const router = useRouter();

  const { title, description, category, slug, author } = data;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const generateSlug = useCallback((title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .substring(0, 50); // Limit length to 50 characters
  }, []);

  useEffect(() => {
    if (title) {
      setData((prevData) => ({ ...prevData, slug: generateSlug(title) }));
    }
  }, [title, generateSlug]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image || !title || !description) {
      toast.error("Please fill in all the required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("slug", slug);
      formData.append("author", author);

      toast.info("Submitting article...");

      const { data } = await axios.post("/api/article", formData);

      if (data?.success) {
        toast.success(data.message || "Article created successfully");
        router.push("/admin/news-list");

        setData({
          title: "",
          description: "",
          category: "Politics",
          slug: "",
          author: "Patnaites",
        });
        setImage(null);
      } else {
        throw new Error(data.message || "Failed to create article");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const imagePreview = useMemo(
    () => (image ? URL.createObjectURL(image) : assets.upload_area),
    [image]
  );

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        {/* Thumbnail */}
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={imagePreview}
            alt="upload_area"
            width={200}
            height={300}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
        />

        {/* Title */}
        <p className="text-xl mt-4">News Title :</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={title}
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
          type="text"
          placeholder="Title"
          required
        />

        {/* Slug */}
        <p className="text-xl mt-4">
          Slug :
          <span className="text-red-500 text-sm">
            (try to write custom slug)
          </span>
        </p>
        <input
          name="slug"
          onChange={onChangeHandler}
          value={slug}
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
          type="text"
          placeholder="e.g: my-first-article"
          required
        />

        {/* Category */}
        <p className="text-xl mt-4">Category :</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={category}
          id="category"
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
        >
          <option>Politics</option>
          <option>Cities</option>
          <option>Business</option>
          <option>Education</option>
          <option>Technology</option>
          <option>Lifestyle</option>
          <option>Travel</option>
          <option>Health</option>
          <option>Weather</option>
          <option>Entertainment</option>
          <option>Sports</option>
          <option>International</option>
          <option>Finance</option>
          <option>Crime</option>
        </select>

        {/* Author */}
        <p className="text-xl mt-4">Author / Source :</p>
        <input
          name="author"
          onChange={onChangeHandler}
          value={author}
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
          type="text"
          placeholder="Author"
          required
        />

        {/* Description */}
        <p className="text-xl mt-4">Description :</p>
        <RTE defaultValue={description} onEditorChange={handleEditorChange} />

        {/* Submit */}
        <button
          className="w-full sm:w-[500px] h-10 bg-black text-white rounded-lg px-3 mt-4 active:bg-blue-600 active:text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Page;
