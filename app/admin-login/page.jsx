// pages/login.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    const myUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const myPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === myUsername && password === myPassword) {
      // Save login status in localStorage or cookies
      localStorage.setItem("isAuthenticated", "true");
      router.push("/admin"); // Redirect to the admin page
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Admin Verification</h1>
      <form
        className="flex flex-col w-80 border border-gray-300 p-4 rounded shadow"
        onSubmit={handleAdminLogin}
      >
        <div className="my-4">
          <label>Username:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label>Password:</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
        <Link
          href="/"
          className="mt-4 text-center bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </Link>
      </form>
    </div>
  );
}
