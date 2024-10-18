"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Client-side component for handling router and dynamic UI changes
export default function ClientComponent() {
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const router = useRouter();

  // Handle page navigation events and display a loading spinner
  useEffect(() => {
    // Prefetch a route to speed up the next navigation
    router.prefetch("/");

    // Set up event listeners for route change start and complete
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Listen for routing events
    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleComplete);

    // Clean up event listeners when component unmounts
    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  // UI Rendering
  return (
    <div className="client-component-container">
      {/* Display loading spinner when loading */}
      {loading && (
        <div className="flex flex-col gap-2 justify-center items-center h-[80vh]">
          <p className="loading-spinner"></p>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
