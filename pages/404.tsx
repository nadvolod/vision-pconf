// pages/404.tsx

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <a href="/" className="mt-6 text-blue-600 hover:underline">
        Go Back Home
      </a>
    </div>
  );
}
