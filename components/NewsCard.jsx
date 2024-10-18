import { assets } from "@/assets/assets";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsCard = ({ slug, image, title, description, category, updatedAt }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#ff0000] rounded-lg overflow-hidden">
      <Link
        href={`/${category.toLowerCase()}/${slug}`}
        className="hover:cursor-pointer"
      >
        <Image
          src={image}
          alt={title || "image"}
          width={400}
          height={400}
          className="w-full h-[12rem] object-cover border-b border-black transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
        />
      </Link>
      <div className="flex justify-between items-center mt-5 mx-5">
        <p className="px-1 inline-block bg-[#ff0000] text-white text-sm">
          {category}
        </p>
        <span className="text-xs">{moment(updatedAt).fromNow()}</span>
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-grey-700">
          {description
            .replace(/(<([^>]+)>)/gi, "")
            .slice(0, 150)
            .concat("...")}
        </p>
        <Link
          href={`/${category.toLowerCase()}/${slug}`}
          className="inline-flex items-center py-2 font-semibold text-center hover:cursor-pointer hover:underline underline-offset-4"
        >
          Read more
          <Image src={assets.arrow} className="ml-2" alt="arrow" width={12} />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
