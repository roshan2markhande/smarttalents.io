import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, BriefcaseBusiness, ShieldCheck, Users, Bot } from "lucide-react";
import homeImage from  "../assets/ai-recruitment.jpg";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold leading-tight mb-6"
            >
              AI-Powered Recruitment Management
            </motion.h1>
            <p className="text-lg mb-6 text-gray-600">
              Streamline your hiring process with intelligent automation, customizable workflows, and real-time analytics.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/company/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Register Your Company
              </Link>
              <Link
                to="/company/login"
                className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Company Login
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <motion.img
              src={homeImage}
              alt="AI Recruitment"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-auto"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 border rounded-lg hover:shadow-md">
              <Rocket className="mx-auto text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold mb-2">Rapid Hiring</h3>
              <p className="text-gray-600 text-sm">Automate candidate screening and interview scheduling in minutes.</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md">
              <BriefcaseBusiness className="mx-auto text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold mb-2">Company Branding</h3>
              <p className="text-gray-600 text-sm">Custom job portals and application forms tailored to your brand.</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md">
              <ShieldCheck className="mx-auto text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold mb-2">Secure & Compliant</h3>
              <p className="text-gray-600 text-sm">All your data is protected with top-tier encryption and role-based access.</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md">
              <Bot className="mx-auto text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold mb-2">AI Candidate Insights</h3>
              <p className="text-gray-600 text-sm">Leverage AI for resume scoring, interview analysis, and shortlisting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Hiring?</h2>
        <p className="mb-6 text-lg">Join hundreds of companies transforming their recruitment process with InterViewApp.</p>
        <Link
          to="/company/register"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 text-sm">
        © 2025 InterViewApp — All rights reserved
      </footer>
    </div>
  );
}
