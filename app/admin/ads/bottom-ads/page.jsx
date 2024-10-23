"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import { toast } from "react-toastify";

const Page = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch all ads
  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/bottom-ad");
      console.log(response);

      setAds(response.data.ads);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.error("Failed to fetch ads!");
    }
  };

  // Delete ad by id
  const deleteAd = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      setLoading(true);
      await axios.delete(`/api/bottom-ad?id=${id}`); // API endpoint to delete ad by id
      setLoading(false);
      toast.info("Ad deleted successfully!");
      fetchAds(); // Refresh the list after deleting
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Failed to delete ad!");
    }
  };

  // Fetch ads when component mounts
  useEffect(() => {
    fetchAds();
  }, []);

  if (loading) return <LoadingAdmin />; // Loading condition fixed

  return (
    <div className="w-full px-4">
      <h1 className="text-3xl font-bold text-center my-10 underline underline-offset-4">
        List of Bottom Ads
      </h1>

      <div className="relative max-h-[80vh] max-w-[100%] overflow-x-auto shadow-md rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-200 sticky top-0">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Link
              </th>
              <th scope="col" className="px-6 py-3">
                Date
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
            {ads.length > 0 ? (
              ads.map((ad) => (
                <tr key={ad._id} className="bg-white border-b text-center">
                  {/* Image */}
                  <td className="px-6 py-4">
                    <Image
                      src={
                        ad.image ||
                        `${process.env.NEXT_PUBLIC_DOMAIN}/favicon.ico`
                      }
                      width={300}
                      height={300}
                      className="w-[200px] h-[120px] rounded-md"
                      alt="ad_image"
                      loading="eager"
                    />
                  </td>

                  {/* Link */}
                  <td className="px-6 py-4">{ad.link || "N/A"}</td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    {ad.updatedAt
                      ? moment(ad.updatedAt).format("MMMM Do YYYY")
                      : "unknown"}
                  </td>

                  {/* Update Action */}
                  <td
                    onClick={() =>
                      router.push(`/admin/ads/bottom-ads/update/${ad._id}`)
                    }
                    className="px-6 py-4 cursor-pointer font-extrabold text-blue-600"
                  >
                    Update
                  </td>

                  {/* Delete Action */}
                  <td
                    onClick={() => deleteAd(ad._id)}
                    className="px-6 py-4 cursor-pointer font-extrabold text-red-600"
                  >
                    X
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No ads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
