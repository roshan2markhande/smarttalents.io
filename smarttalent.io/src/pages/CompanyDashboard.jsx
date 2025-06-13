// updated dashboard component with search and AI assistant
import { useState } from "react";
import {
  LogOut, Users, FileText, BarChart2, Settings, LayoutDashboard, Briefcase,
} from "lucide-react";

import JobPostManager from "../components/JobPostManager";
import UploadStudentManager from "../components/UploadStudentManager";
import InvitationSender from "../components/InvitationSender";
import SubmissionViewer from "../components/SubmissionViewer";
import ProgressAnalytics from "../components/ProgressAnalytics";
import CommunicationLogs from "../components/CommunicationLogs";
import CompanyCustomizer from "./CompanyCustomizer";

export default function CompanyDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [theme, setTheme] = useState("light");
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiInput, setAiInput] = useState("");
  
  const [aiResponse, setAiResponse] = useState("");

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <DashboardOverview />;
      case "jobs": return <JobPostManager />;
      case "students": return <UploadStudentManager />;
      case "invites": return <InvitationSender />;
      case "submissions": return <SubmissionViewer />;
      case "analytics": return <ProgressAnalytics />;
      case "communications": return <CommunicationLogs />;
      case "ai": return <div className="p-4 bg-white rounded shadow">AI Insights Coming Soon</div>;
      default: return null;
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="px-6 py-4 font-bold text-xl border-b border-gray-200">
          <span className="text-blue-600">Company</span>Panel
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => setActiveSection("overview")} />
          <SidebarItem icon={<Briefcase size={18} />} label="Jobs" onClick={() => setActiveSection("jobs")} />
          <SidebarItem icon={<Users size={18} />} label="Students" onClick={() => setActiveSection("students")} />
          <SidebarItem icon={<FileText size={18} />} label="Invites" onClick={() => setActiveSection("invites")} />
          <SidebarItem icon={<BarChart2 size={18} />} label="Submissions" onClick={() => setActiveSection("submissions")} />
          <SidebarItem icon={<Settings size={18} />} label="Analytics" onClick={() => setActiveSection("analytics")} />
          <SidebarItem icon={<FileText size={18} />} label="Logs" onClick={() => setActiveSection("communications")} />
          <SidebarItem icon={<Settings size={18} />} label="AI Insights" onClick={() => setActiveSection("ai")} />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`shadow p-4 flex items-center justify-between ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Company Dashboard</h1>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Jobs, Students, etc."
              className="ml-4 px-3 py-1 rounded border text-sm w-80"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-sm px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button
              onClick={() => setShowCustomizer(true)}
              className="text-sm px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Customize
            </button>
            <button
              className="flex items-center gap-2 px-4 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/company/login";
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {renderSection()}
        </main>

        {showCustomizer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 max-w-2xl w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCustomizer(false)}
              >✕</button>
              <CompanyCustomizer />
            </div>
          </div>
        )}

        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700"
        >
          🤖 AI Help
        </button>

        {showAI && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-xl max-w-md w-full relative">
              <button onClick={() => setShowAI(false)} className="absolute top-2 right-2 text-gray-600">✕</button>
              <h2 className="text-xl font-bold mb-2">AI Assistant</h2>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="e.g. How do I write better job descriptions?"
                className="w-full border rounded p-2"
              />
              <button
                onClick={async () => {
                  setAiResponse("Thinking...");
                  try {
                    const res = await fetch("https://api.openai.com/v1/chat/completions", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
                      },
                      body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                          { role: "system", content: "You are an assistant helping companies with hiring and branding strategies." },
                          { role: "user", content: aiInput }
                        ]
                      })
                    });
                    const data = await res.json();
                    setAiResponse(data.choices?.[0]?.message?.content || "No response");
                  } catch (err) {
                    setAiResponse("Error retrieving AI response.");
                  }
                }}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Ask
              </button>
              {aiResponse && (
                <p className="mt-4 text-sm text-gray-800 whitespace-pre-line">💬 {aiResponse}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 text-left">
    {icon}
    <span>{label}</span>
  </button>
);

const DashboardOverview = () => (
  <div className="bg-white p-6 rounded shadow mb-6">
    <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-blue-100 p-4 rounded">
        <p className="text-3xl font-bold">12</p>
        <p>Total Jobs</p>
      </div>
      <div className="bg-green-100 p-4 rounded">
        <p className="text-3xl font-bold">240</p>
        <p>Total Invites Sent</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded">
        <p className="text-3xl font-bold">150</p>
        <p>Total Submissions</p>
      </div>
    </div>
  </div>
);
