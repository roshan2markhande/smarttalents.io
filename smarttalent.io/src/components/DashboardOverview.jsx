import { useEffect, useState } from "react";

export default function DashboardOverview({ onAction }) {
  const [stats, setStats] = useState({
    jobs: 0,
    invites: 0,
    submissions: 0,
  });

  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    // Simulate API calls
    setStats({
      jobs: 4,
      invites: 85,
      submissions: 53,
    });

    setActivityLogs([
      "20 students invited for ‘Frontend Intern’",
      "10 new submissions received today",
      "New job posted: Backend Developer",
      "Video interview uploaded by Rahul Sharma",
    ]);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Dashboard Overview</h2>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {[
          ["Jobs Posted", stats.jobs],
          ["Invitations Sent", stats.invites],
          ["Submissions Received", stats.submissions],
        ].map(([label, count], i) => (
          <div key={i} className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-3xl font-semibold text-blue-900">{count}</p>
          </div>
        ))}
      </div>

      {/* Activity Logs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Activity</h3>
        <ul className="list-disc list-inside text-gray-600">
          {activityLogs.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 flex-wrap">
        {[
          ["Create Job", "createJob"],
          ["Upload Students", "uploadStudents"],
          ["View Submissions", "viewSubmissions"],
          ["Export Reports", "exportReports"],
        ].map(([label, action]) => (
          <button
            key={action}
            onClick={() => onAction(action)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
