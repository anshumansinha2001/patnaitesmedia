import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl">Oops! Page Not Found.</p>
      <p className="text-md mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link href="/">
        <div className="text-white hover:bg-blue-700 text-xl bg-blue-600 p-4 rounded-full">
          Go Back to Homepage
        </div>
      </Link>
    </div>
  );
}
