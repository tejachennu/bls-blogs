export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div>
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl mt-4 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mt-2">Sorry, we couldn’t find that page.</p>
        <a href="/" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Back to Home
        </a>
      </div>
    </div>
  );
}
