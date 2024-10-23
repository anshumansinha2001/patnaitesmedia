"use client";

import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import axios from "axios";
import { useEffect, useState } from "react";

const AdsDashboard = () => {
  const [betweenAds, setBetweenAds] = useState([]);
  const [bottomAds, setBottomAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch between ads
  const fetchBetweenAds = async () => {
    try {
      const response = await axios.get("/api/between-ad");
      setBetweenAds(response.data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch bottom ads
  const fetchBottomAds = async () => {
    try {
      const response = await axios.get("/api/bottom-ad");
      setBottomAds(response.data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      await fetchBetweenAds();
      await fetchBottomAds();
      setLoading(false);
    };
    fetchAdsData();
  }, []);

  if (loading) {
    return <LoadingAdmin />;
  }

  return (
    <div className="w-full px-4">
      <h1 className="text-3xl font-bold text-center my-20">Advertisements</h1>
      <div className="flex gap-5 font-medium justify-around items-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl">Total Between Ads:</h2>
          <p className="text-5xl">{betweenAds.length}</p>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-xl">Total Bottom Ads:</h2>
          <p className="text-5xl">{bottomAds.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdsDashboard;
