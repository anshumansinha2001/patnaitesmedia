"use client";

import Link from "next/link";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <p className="text-sm md:text-base text-center my-6 max-w-[500px]">
        {success
          ? "We’ve successfully received your message and our team is already reviewing it. Your inquiry is important to us. Expect a response shortly!"
          : "At Patnaites News, we keep you updated! Reach out to us for brand promotions or advertisements."}
      </p>
      {success ? (
        <div
          className="flex flex-col items-center justify-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">Your message has been sent.</span>
          <Link
            href="/"
            className="bg-black text-xs hover:bg-gray-700 text-white font-semibold  py-2 px-4 rounded"
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>
          <div className="flex items-center justify-between text-xs md:text-base">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
            <div className="bg-black hover:bg-gray-700 text-white font-bold  py-2 px-4 rounded">
              <Link href="/">Return to Home</Link>
            </div>
          </div>
        </form>
      )}
      <p className="text-center text-gray-600 mt-4">
        We will get back to you as soon as possible!
      </p>
    </div>
  );
};

export default Contact;
