import { useState } from "react";

export default function SubmissionViewer() {
  const [submissions, setSubmissions] = useState([
    {
      name: "Ravi Mehra",
      email: "ravi@example.com",
      job: "Frontend Intern",
      resumeUrl: "/resumes/ravi.pdf",
      mcqScore: 17,
      totalMcq: 20,
      codingAnswer: `function sum(a, b) {\n  return a + b;\n}`,
      codeFeedback: "Function works correctly. Edge cases not tested.",
      videoUrl: "/videos/ravi.mp4",
      status: "Not Reviewed",
    },
    {
      name: "Priya Kulkarni",
      email: "priya@example.com",
      job: "Backend Intern",
      resumeUrl: "/resumes/priya.pdf",
      mcqScore: 19,
      totalMcq: 20,
      codingAnswer: `def factorial(n):\n  return 1 if n == 0 else n * factorial(n-1)`,
      codeFeedback: "Efficient recursion, well done.",
      videoUrl: "/videos/priya.mp4",
      status: "Shortlisted",
    },
  ]);

  const updateStatus = (index, newStatus) => {
    const updated = [...submissions];
    updated[index].status = newStatus;
    setSubmissions(updated);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">📑 View Submissions</h2>

      {submissions.map((submission, idx) => (
        <div key={idx} className="border p-4 mb-6 rounded shadow-sm bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            {submission.name} – {submission.job}
          </h3>
          <p className="text-sm text-gray-600 mb-2">Email: {submission.email}</p>

          {/* Resume */}
          <div className="mb-2">
            <span className="font-semibold">Resume:</span>{" "}
            <a
              href={submission.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View PDF
            </a>
          </div>

          {/* MCQ */}
          <div className="mb-2">
            <span className="font-semibold">MCQ Score:</span>{" "}
            {submission.mcqScore} / {submission.totalMcq}
          </div>

          {/* Coding Answer */}
          <div className="mb-2">
            <span className="font-semibold">Coding Answer:</span>
            <pre className="bg-black text-green-400 p-3 mt-1 rounded text-sm overflow-x-auto">
              {submission.codingAnswer}
            </pre>
            <p className="text-sm text-gray-600 mt-1">
              <strong>AI Feedback:</strong> {submission.codeFeedback}
            </p>
          </div>

          {/* Video */}
          <div className="mb-2">
            <span className="font-semibold">Video Interview:</span>
            <video
              controls
              src={submission.videoUrl}
              className="w-full mt-2 rounded"
            />
          </div>

          {/* Status Controls */}
          <div className="mt-4 flex gap-2">
            <span className="font-semibold">Status:</span>
            <select
              value={submission.status}
              onChange={(e) => updateStatus(idx, e.target.value)}
              className="p-1 border rounded"
            >
              <option>Not Reviewed</option>
              <option>Reviewed</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
