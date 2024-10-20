"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsList from "@/components/NewsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <div className="min-h-[94vh]">
        <ToastContainer theme="dark" position="top-right" />
        <Header />
        <NewsList />
      </div>
      <Footer />
    </>
  );
}
