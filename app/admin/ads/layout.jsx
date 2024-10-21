import AdminAdsSidebar from "@/components/AdsComponents/AdminAdsSidebar";
import React from "react";

const AdsLayout = ({ children }) => {
  return (
    <div className="hidden md:flex min-h-screen">
      <AdminAdsSidebar />
      {children}
    </div>
  );
};

export default AdsLayout;
