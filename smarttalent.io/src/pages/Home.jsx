import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">InterViewApp</h1>
          <nav>
            <Link to="/company/login" className="mr-4 text-blue-600 font-medium">Company Login</Link>
            <Link to="/company/register" className="text-blue-600 font-medium">Register</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-20 bg-blue-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Smart Hiring Made Easy</h2>
        <p className="text-lg text-gray-600 mb-8">
          Companies can post jobs, and candidates can apply with video interviews.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
            I'm a Candidate
          </Link>
          <Link to="/company/login" className="bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-900">
            I'm a Company
          </Link>
        </div>
      </section>

      {/* Optional: Footer */}
      <footer className="text-center p-4 text-gray-500">
        © 2025 InterViewApp — All rights reserved
      </footer>
    </div>
  );
}
