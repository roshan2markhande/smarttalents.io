import { useState } from "react";

// Import all components here (we'll keep them simple and inline for demo)
const DashboardOverview = () => {
  return (
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
};

const JobPostManager = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer Intern", role: "Intern", mcqs: 20, codingQs: 2, timeLimit: 60 },
    { id: 2, title: "Backend Developer", role: "Full-time", mcqs: 20, codingQs: 2, timeLimit: 90 },
  ]);
  const [newJob, setNewJob] = useState({ title: "", role: "", mcqs: 20, codingQs: 2, timeLimit: 60 });

  const addJob = () => {
    if (!newJob.title || !newJob.role) return alert("Title and Role required");
    setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]);
    setNewJob({ title: "", role: "", mcqs: 20, codingQs: 2, timeLimit: 60 });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Job Posts</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Job Title"
          className="border p-2 rounded flex-grow"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role (Intern/Full-time)"
          className="border p-2 rounded flex-grow"
          value={newJob.role}
          onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
        />
        <input
          type="number"
          placeholder="MCQs"
          className="border p-2 rounded w-20"
          value={newJob.mcqs}
          onChange={(e) => setNewJob({ ...newJob, mcqs: +e.target.value })}
          min={0}
        />
        <input
          type="number"
          placeholder="Coding Qs"
          className="border p-2 rounded w-20"
          value={newJob.codingQs}
          onChange={(e) => setNewJob({ ...newJob, codingQs: +e.target.value })}
          min={0}
        />
        <input
          type="number"
          placeholder="Time Limit (min)"
          className="border p-2 rounded w-28"
          value={newJob.timeLimit}
          onChange={(e) => setNewJob({ ...newJob, timeLimit: +e.target.value })}
          min={0}
        />
        <button onClick={addJob} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Add Job
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">MCQs</th>
            <th className="border border-gray-300 p-2">Coding Qs</th>
            <th className="border border-gray-300 p-2">Time Limit (min)</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="text-center">
              <td className="border border-gray-300 p-2">{job.title}</td>
              <td className="border border-gray-300 p-2">{job.role}</td>
              <td className="border border-gray-300 p-2">{job.mcqs}</td>
              <td className="border border-gray-300 p-2">{job.codingQs}</td>
              <td className="border border-gray-300 p-2">{job.timeLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UploadStudentManager = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "", college: "", stream: "" });

  const addStudent = () => {
    if (!newStudent.name || !newStudent.email) return alert("Name and Email required");
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    setNewStudent({ name: "", email: "", phone: "", college: "", stream: "" });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Upload Students</h2>

      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded flex-grow"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded flex-grow"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 rounded flex-grow"
          value={newStudent.phone}
          onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="College"
          className="border p-2 rounded flex-grow"
          value={newStudent.college}
          onChange={(e) => setNewStudent({ ...newStudent, college: e.target.value })}
        />
        <input
          type="text"
          placeholder="Stream"
          className="border p-2 rounded flex-grow"
          value={newStudent.stream}
          onChange={(e) => setNewStudent({ ...newStudent, stream: e.target.value })}
        />
        <button onClick={addStudent} className="bg-green-600 text-white px-4 rounded hover:bg-green-700">
          Add Student
        </button>
      </div>

      <div className="overflow-auto max-h-48 border border-gray-300 rounded">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">College</th>
              <th className="border border-gray-300 p-2">Stream</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="border border-gray-300 p-2">{s.name}</td>
                <td className="border border-gray-300 p-2">{s.email}</td>
                <td className="border border-gray-300 p-2">{s.phone}</td>
                <td className="border border-gray-300 p-2">{s.college}</td>
                <td className="border border-gray-300 p-2">{s.stream}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InvitationSender = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [jobs] = useState([
    { id: 1, title: "Frontend Developer Intern" },
    { id: 2, title: "Backend Developer" },
  ]);
  const [students] = useState([
    { id: 1, name: "Ravi Mehra", email: "ravi@example.com" },
    { id: 2, name: "Priya Kulkarni", email: "priya@example.com" },
    { id: 3, name: "Arjun Patil", email: "arjun@example.com" },
  ]);

  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const sendInvites = () => {
    if (!selectedJob) return alert("Select a job first");
    if (selectedStudents.length === 0) return alert("Select at least one student");
    alert(`Sending invites for job ${selectedJob} to students: ${selectedStudents.join(", ")}`);
    // TODO: actual API call
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Send Invitations</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Job</label>
        <select
          className="border p-2 rounded w-full max-w-xs"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="">-- Select Job --</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.title}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 max-h-48 overflow-auto border border-gray-300 rounded p-2">
        <p className="font-semibold mb-2">Select Students</p>
        {students.map((s) => (
          <label key={s.id} className="block">
            <input
              type="checkbox"
              checked={selectedStudents.includes(s.id)}
              onChange={() => toggleStudent(s.id)}
              className="mr-2"
            />
            {s.name} ({s.email})
          </label>
        ))}
      </div>

      <button
        onClick={sendInvites}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Send Invitation
      </button>
    </div>
  );
};

const SubmissionViewer = () => {
  const [submissions] = useState([
    {
      id: 1,
      studentName: "Ravi Mehra",
      job: "Frontend Developer Intern",
      mcqScore: 18,
      codingScore: 85,
      resumeUrl: "#",
      videoUrl: "#",
      status: "Completed",
    },
    {
      id: 2,
      studentName: "Priya Kulkarni",
      job: "Backend Developer",
      mcqScore: 15,
      codingScore: 72,
      resumeUrl: "#",
      videoUrl: "#",
      status: "In Progress",
    },
  ]);

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">View Submissions</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Student</th>
            <th className="border border-gray-300 p-2">Job</th>
            <th className="border border-gray-300 p-2">MCQ Score</th>
            <th className="border border-gray-300 p-2">Coding Score</th>
            <th className="border border-gray-300 p-2">Resume</th>
            <th className="border border-gray-300 p-2">Video Interview</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id}>
              <td className="border border-gray-300 p-2">{sub.studentName}</td>
              <td className="border border-gray-300 p-2">{sub.job}</td>
              <td className="border border-gray-300 p-2">{sub.mcqScore}</td>
              <td className="border border-gray-300 p-2">{sub.codingScore}</td>
              <td className="border border-gray-300 p-2">
                <a href={sub.resumeUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                  View Resume
                </a>
              </td>
              <td className="border border-gray-300 p-2">
                <a href={sub.videoUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                  Watch Video
                </a>
              </td>
              <td className="border border-gray-300 p-2">{sub.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProgressAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Progress & Analytics (Coming Soon)</h2>
      <p>Visual charts and metrics will be added here to track submission rates, average scores, etc.</p>
    </div>
  );
};

const CommunicationLogs = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      studentName: "Ravi Mehra",
      email: "ravi@example.com",
      job: "Frontend Intern",
      status: "Delivered",
      lastSent: "2025-06-01 10:30",
      followUps: ["Sent reminder on 2025-06-05"],
    },
    {
      id: 2,
      studentName: "Priya Kulkarni",
      email: "priya@example.com",
      job: "Backend Intern",
      status: "Clicked",
      lastSent: "2025-06-02 12:45",
      followUps: [],
    },
  ]);

  const resendInvite = (id) => {
    alert(`Resend invite for log id: ${id}`);
  };

  const exportCSV = () => {
    const csvRows = [];
    csvRows.push("Student Name,Email,Job,Status,Last Sent,Follow Ups");
    logs.forEach(({ studentName, email, job, status, lastSent, followUps }) => {
      csvRows.push(
        `"${studentName}","${email}","${job}","${status}","${lastSent}","${followUps.join("; ")}"`
      );
    });
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "communication_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">📬 Communication Logs & Export</h2>
      <button
        onClick={exportCSV}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Export CSV
      </button>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Student Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Job</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Last Sent</th>
            <th className="border border-gray-300 p-2">Follow Ups</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border border-gray-300 p-2">{log.studentName}</td>
              <td className="border border-gray-300 p-2">{log.email}</td>
              <td className="border border-gray-300 p-2">{log.job}</td>
              <td className="border border-gray-300 p-2">{log.status}</td>
              <td className="border border-gray-300 p-2">{log.lastSent}</td>
              <td className="border border-gray-300 p-2">{log.followUps.join(", ") || "-"}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => resendInvite(log.id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Resend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AIInsights = () => {
  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">AI Insights & Suggestions (Coming Soon)</h2>
      <p>AI-powered suggestions, question generation, candidate analysis, and more will be integrated here.</p>
    </div>
  );
};

export default function CompanyDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
      </header>

      <DashboardOverview />
      <JobPostManager />
      <UploadStudentManager />
      <InvitationSender />
      <SubmissionViewer />  
      <ProgressAnalytics />
      <CommunicationLogs />
      <AIInsights />
    </div>
  );
}
