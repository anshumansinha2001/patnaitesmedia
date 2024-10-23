import React from "react";

const LoadingAdmin = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-[90vh] w-full">
      <p className="loading-spinner"></p>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingAdmin;
