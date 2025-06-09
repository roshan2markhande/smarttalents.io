import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b"];

export default function ProgressAnalytics() {
  const testStatusData = [
    { name: "Not Started", value: 10 },
    { name: "In Progress", value: 5 },
    { name: "Completed", value: 25 },
  ];

  const scoreTrendData = [
    { name: "Frontend Intern", mcq: 15, code: 30 },
    { name: "Backend Intern", mcq: 18, code: 28 },
    { name: "Java Role", mcq: 12, code: 25 },
  ];

  const resumeRatings = [
    { name: "Excellent", value: 12 },
    { name: "Average", value: 18 },
    { name: "Weak", value: 10 },
  ];

  const submissionRate = [
    { name: "Week 1", submissions: 12 },
    { name: "Week 2", submissions: 20 },
    { name: "Week 3", submissions: 15 },
  ];

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">📊 Analytics & Progress Tracking</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Test Status Pie */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Test Status</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={testStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {testStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Resume Ratings */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Resume Quality (AI Rated)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resumeRatings}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Submission Trend */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Submission Rate (Weekly)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={submissionRate}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="submissions" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Score Comparison */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Average Scores by Role</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreTrendData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mcq" fill="#3b82f6" name="MCQ" />
              <Bar dataKey="code" fill="#f59e0b" name="Coding" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
