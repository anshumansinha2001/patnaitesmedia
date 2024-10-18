"use client";
import React from "react";
import { FaShareSquare } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SocialShare = ({ url }) => {
  const shareUrl = url;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          url: shareUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback action if Web Share API is not supported
      alert("Please use a browser that supports sharing.");
      console.log("Web Share API not supported in this browser");
    }
  };

  return (
    <div className="flex space-x-2 md:space-x-3">
      <TwitterShareButton url={shareUrl}>
        <XIcon size={35} className="rounded-full" />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} separator=" :- ">
        <WhatsappIcon size={35} className="rounded-full" />
      </WhatsappShareButton>

      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={35} className="rounded-full" />
      </FacebookShareButton>

      {/* Share button to copy link */}
      <button
        onClick={handleShare}
        className="p-2 rounded-full bg-pink-500 text-white"
      >
        <FaShareSquare />
      </button>
    </div>
  );
};

export default SocialShare;
