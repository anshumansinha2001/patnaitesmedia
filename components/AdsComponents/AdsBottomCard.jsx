"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdsBottomCard = () => {
  const [bottomAds, setBottomAds] = useState([]);

  // Fetch all bottom ads
  const fetchAds = async () => {
    try {
      const response = await axios.get("/api/bottom-ad");
      setBottomAds(response.data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch ads when component mounts
  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="flex justify-center items-center gap-1 lg:gap-2 flex-wrap overflow-auto my-2">
      {bottomAds &&
        bottomAds.map((advertisement) => (
          <Link
            href={advertisement.link.length ? advertisement.link : "#"}
            key={advertisement._id}
            target={advertisement.link ? "_blank" : "_self"}
          >
            <div className="relative">
              <Image
                src={advertisement.image}
                alt="Failed to load image!"
                width={200}
                height={200}
                className={`${
                  bottomAds.length === 1
                    ? "w-96 h-64"
                    : "h-[8rem] w-[11.1rem] sm:h-[8.5rem] sm:w-[11.3rem] md:h-[12rem] md:w-[15.4rem] lg:h-44 lg:w-[18.8rem] xl:h-52 xl:w-[22rem]"
                }`}
              />
              <p className="absolute top-1 left-1 text-sm text-gray-300 z-10">
                • Ads
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default AdsBottomCard;
