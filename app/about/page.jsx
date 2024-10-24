import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] space-y-2">
      <h1 className="text-3xl font-bold">Hi there,</h1>
      <p className="text-center text-xl md:text-3xl">
        Welcome to the Patnaitesnews
      </p>
      <p className="text-center text-sm md:text:md text-gray-500">
        Stay updated with the latest news and events happening in Patna. Explore
        articles, interviews, and stories that matter to Patnaites.
      </p>
    </div>
  );
};

export default page;
