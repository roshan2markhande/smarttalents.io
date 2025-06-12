import { useState } from "react";
import {
  LogOut,
  Users,
  FileText,
  BarChart2,
  Settings,
  LayoutDashboard,
  Briefcase,
} from "lucide-react";

import JobPostManager from "../components/JobPostManager";
import UploadStudentManager from "../components/UploadStudentManager";
import InvitationSender from "../components/InvitationSender";
import SubmissionViewer from "../components/SubmissionViewer";
import ProgressAnalytics from "../components/ProgressAnalytics";
import CommunicationLogs from "../components/CommunicationLogs";

export default function CompanyDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "jobs":
        return <JobPostManager />;
      case "students":
        return <UploadStudentManager />;
      case "invites":
        return <InvitationSender />;
      case "submissions":
        return <SubmissionViewer />;
      case "analytics":
        return <ProgressAnalytics />;
      case "communications":
        return <CommunicationLogs />;
      case "ai":
        return <AIInsights />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
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

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Company Dashboard</h1>
          <button className="flex items-center gap-2 px-4 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded">
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          {renderSection()}
        </main>
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
