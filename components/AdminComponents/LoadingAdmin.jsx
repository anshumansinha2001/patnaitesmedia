import React from "react";

const LoadingAdmin = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center min-h-[85vh]">
        <p className="loading-spinner"></p>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingAdmin;
