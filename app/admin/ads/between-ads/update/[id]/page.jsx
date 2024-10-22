"use client";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import AdminAdsPost from "@/components/AdsComponents/AdminAdsPost";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateBetweenAd = ({ params }) => {
  const { id } = params; // Assuming you are passing the ad ID in the URL parameters
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch ad by ID
  const fetchAdById = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/between-ad?id=${id}`);
      setAd(response.data.ad);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch ad!");
      console.log(error);
    }
  }, [id]);

  // Fetch ad when component mounts
  useEffect(() => {
    fetchAdById();
  }, [fetchAdById]);

  if (loading) return <LoadingAdmin />;

  if (!ad) return <div>No ad found!</div>;
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center my-20  underline underline-offset-4">
        Create between Ads
      </h1>
      <AdminAdsPost ad={ad} location="between-ads" route="between-ad" />
    </div>
  );
};

export default UpdateBetweenAd;
