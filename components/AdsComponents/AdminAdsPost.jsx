"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingAdmin from "../AdminComponents/LoadingAdmin";
import { assets } from "@/assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const AdminAdsPost = ({ ad }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);

    // If ad exists, set the form values for updating
    if (ad) {
      setValue("link", ad?.link || "");
      setImage(ad?.image || null);
    }
  }, [ad, setValue]);

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Please add an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("link", data.link);

    try {
      setLoading(true);
      let response;

      if (ad) {
        // Update existing ad if 'ad' object is provided
        response = await axios.put(`/api/bottom-ad?id=${ad._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.info("Ad updated successfully");
      } else {
        // Create new ad if 'ad' is not provided
        response = await axios.post("/api/bottom-ad", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Ad created successfully");
      }

      reset();
      setImage(null);

      router.push("/admin/ads");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit ad.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const imagePreview = useMemo(() => {
    return image
      ? typeof image === "string"
        ? image
        : URL.createObjectURL(image)
      : assets.upload_area;
  }, [image]);

  if (loading) return <LoadingAdmin />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 justify-start items-center"
    >
      {/* Image Upload Section */}
      <div>
        <p className="text-xl text-center">Upload Ad Image</p>
        <label htmlFor="image">
          <Image
            className="mt-4 w-[350px]  hover:cursor-pointer"
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
      </div>

      {/* Link Input */}
      <div>
        <p className="text-xl mt-4">Link :</p>
        <input
          {...register("link")}
          className="w-full sm:w-[500px] h-10 border border-black rounded-lg px-3"
          type="text"
          placeholder="Link of this Advertisement"
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full sm:w-[500px] h-10 bg-black text-white rounded-lg px-3 mt-4 active:bg-blue-600 active:text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AdminAdsPost;
