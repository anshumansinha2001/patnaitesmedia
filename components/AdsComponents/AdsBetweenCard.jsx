import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdsBetweenCard = ({ image, link }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[90%] relative my-4">
        <Link href={link ? link : "#"} target={link ? "_blank" : "_self"}>
          <Image
            src={image}
            width={300}
            height={300}
            alt="Failed to load image!"
            className="h-52 w-screen md:h-80 xl:h-96 "
          />
          <p className="absolute top-1 left-1 text-sm text-gray-300 z-10">
            • Ads
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdsBetweenCard;
