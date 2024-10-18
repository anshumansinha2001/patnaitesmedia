import Link from "next/link";

export default function CPageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page Not Found.</p>
      <Link href="/">
        <div className="text-blue-500 hover:underline text-xl">
          Go Back to Homepage
        </div>
      </Link>
    </div>
  );
}
