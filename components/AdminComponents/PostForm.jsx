"use client";
import { assets } from "@/assets/assets";
import RTE from "@/components/AdminComponents/RTE";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import LoadingAdmin from "./LoadingAdmin";

const PostPage = ({ post }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState(null);
  const title = watch("title");

  // Set default form values when articles data is loaded
  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      setValue("title", post?.title || "");
      setValue("slug", post?.slug || "");
      setValue("category", post?.category || "Polotics");
      setValue("author", post?.author || "Patnaites");
      setValue("description", post?.description || "");
      setImage(post?.image || null);
    }
  }, [post, setValue]);

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
      setValue("slug", generateSlug(title));
    }
  }, [title, generateSlug, setValue]);

  const onSubmit = async (data) => {
    if (!image || !data.description) {
      toast.error("Please add an image and description!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("slug", data.slug);
    formData.append("author", data.author);

    try {
      setLoading(true);
      let response;
      if (post) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/article?id=${post._id}`,
          formData
        );
        setLoading(false);
        toast.success(response.data.message || "Article updated successfully");
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
          formData
        );
        setLoading(false);
        toast.success(response.data.message || "Article created successfully");
      }

      // Reset the form and clear image state
      reset();
      setImage(null);
      router.push("/admin/news-list");
    } catch (error) {
      let errorMessage = "Something went wrong";
      setLoading(false);
      // Check if there's a response from the server
      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status >= 500) {
          errorMessage = "Server error, please try again later";
        } else {
          errorMessage =
            "Failed to submit the article, check your data and try again";
        }
      } else if (error.request) {
        errorMessage =
          "No response from server. Please check your network connection.";
      } else {
        errorMessage = error.message;
      }
      console.error("Error submitting article:", error);
      toast.error(errorMessage);
    }
  };

  const imagePreview = useMemo(() => {
    return image
      ? typeof image === "string"
        ? image
        : URL.createObjectURL(image)
      : assets.upload_area;
  }, [image]);

  if (loading) {
    return <LoadingAdmin />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-5 px-5 sm:pt-12 sm:pl-16"
      >
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
          {...register("title", { required: true })}
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
          type="text"
          placeholder="Title"
        />
        {errors.title && <p className="text-red-500">Title is required</p>}

        {/* Slug */}
        <p className="text-xl mt-4">
          Slug :
          <span className="text-red-500 text-sm">
            (try to write custom slug)
          </span>
        </p>
        <input
          {...register("slug", { required: true })}
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
          type="text"
          placeholder="e.g: my-first-article"
        />
        {errors.slug && <p className="text-red-500">Slug is required</p>}

        {/* Category */}
        <p className="text-xl mt-4">Category :</p>
        <select
          {...register("category", { required: true })}
          id="category"
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
        >
          <option>International</option>
          <option>Business</option>
          <option>Politics</option>
          <option>Education</option>
          <option>Technology</option>
          <option>Crime</option>
          <option>Cities</option>
          <option>Entertainment</option>
          <option>Lifestyle</option>
          <option>Sports</option>
          <option>Culture</option>
          <option>Finance</option>
          <option>Religion</option>
          <option>Travel</option>
          <option>Career</option>
          <option>Health</option>
          <option>Weather</option>
          <option>Food</option>
          <option>Fashion</option>
          <option>Innovation</option>
          <option>Environment</option>
          <option>Science</option>
          <option>Economy</option>
          <option>Media</option>
          <option>Opinion</option>
          <option>Military-Defense</option>
        </select>

        {/* Author */}
        <p className="text-xl mt-4">Author / Source :</p>
        <input
          {...register("author", { required: true })}
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
          type="text"
          placeholder="Author"
          defaultValue="Patnaites"
        />
        {errors.author && <p className="text-red-500">Author is required</p>}

        {/* Description */}
        <p className="text-xl mt-4">Description :</p>
        <RTE defaultValue={post?.description} control={control} />

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

export default PostPage;
