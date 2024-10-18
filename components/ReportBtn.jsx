"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ReportBtn = ({ slug }) => {
  const router = useRouter();

  const handleReport = () => {
    router.push(`/report/${slug}`);
  };
  return (
    <button
      onClick={handleReport}
      className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#000000] text-xs sm:text-base active:bg-[#ff0000] active:text-white"
    >
      Report <Image src={assets.arrow} alt="arrow" />
    </button>
  );
};

export default ReportBtn;
