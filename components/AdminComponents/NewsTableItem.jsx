import moment from "moment";
import Image from "next/image";
import React from "react";

const NewsTableItem = ({
  title,
  image,
  category,
  updatedAt,
  author,
  _id,
  deleteArticle,
}) => {
  const formatDate = moment(updatedAt).format("MMMM Do YYYY");
  return (
    <tr className="bg-white border-b text-center">
      <td className="px-6 py-4">
        <Image
          src={image || `${process.env.NEXT_PUBLIC_DOMAIN}/favicon.ico`}
          width={50}
          height={50}
          className="w-50 h-12 rounded-full"
          alt="blog_icon"
        />
      </td>
      <td className="px-6 py-4">{title || "Title"}</td>
      <td className="px-6 py-4">{category || "Category"}</td>
      <td className="px-6 py-4">{formatDate || "Date"}</td>
      <td className="px-6 py-4">{author || "Author"}</td>
      <td
        onClick={() => deleteArticle(_id)}
        className="px-6 py-4 cursor-pointer font-extrabold"
      >
        X
      </td>
    </tr>
  );
};

export default NewsTableItem;
