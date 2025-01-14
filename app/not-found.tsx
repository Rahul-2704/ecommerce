import { Metadata } from "next";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-700">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href="/products"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Back to All Products
      </a>
    </div>
  );
}

export async function generateMetadata(
): Promise<Metadata> {
  return {
    title: "Not Found",
    description: `Page Not Found`,
  };
}
