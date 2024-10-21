"use client";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import AdminAdsPost from "@/components/AdsComponents/AdminAdsPost";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = ({ params }) => {
  const { id } = params; // Assuming you are passing the ad ID in the URL parameters
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch ad by ID
  const fetchAdById = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/bottom-ad?id=${id}`); // API endpoint to fetch ad by ID
      setAd(response.data.ad); // Assuming the response contains 'ad'
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch ad!");
      console.log(error);
    }
  };

  // Fetch ad when component mounts
  useEffect(() => {
    fetchAdById();
  }, [id]);

  if (loading) return <LoadingAdmin />;

  if (!ad) return <div>No ad found!</div>;
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center my-20  underline underline-offset-4">
        Create Bottom Ads
      </h1>
      <AdminAdsPost ad={ad} />
    </div>
  );
};

export default page;
