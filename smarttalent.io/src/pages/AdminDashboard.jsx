import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    const interviews = JSON.parse(localStorage.getItem("interviewSubmissions")) || [];
    setApplications(apps);
    setInterviews(interviews);
  }, []);

  const getInterview = (jobId) => {
    return interviews.find((i) => i.jobId === jobId);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel – Candidate Submissions</h1>

      {applications.length === 0 ? (
        <p>No candidates have applied yet.</p>
      ) : (
        applications.map((app, idx) => {
          const interview = getInterview(app.jobId);
          return (
            <div key={idx} className="mb-6 border p-4 rounded bg-white shadow">
              <h2 className="text-xl font-semibold">Candidate #{idx + 1}</h2>
              <p className="text-sm text-gray-600">Job ID: {app.jobId}</p>
              <p className="text-sm text-gray-600">Applied At: {new Date(app.appliedAt).toLocaleString()}</p>

              <div className="mt-4">
                <h3 className="font-semibold">📄 Resume:</h3>
                <iframe
                  src={app.resume}
                  title={`Resume ${idx}`}
                  className="w-full h-48 border"
                />
              </div>

              {interview ? (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">📝 MCQ Answers:</h3>
                  <ul className="list-disc pl-6">
                    {interview.answers.mcq.map((ans, i) => (
                      <li key={i}>Q{i + 1}: {ans || <em className="text-red-500">Unanswered</em>}</li>
                    ))}
                  </ul>

                  <h3 className="font-semibold mt-4 mb-2">💻 Code Answers:</h3>
                  {interview.answers.code.map((ans, i) => (
                    <pre key={i} className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">{ans}</pre>
                  ))}

                  <p className="text-sm text-gray-500">
                    📅 Submitted At: {new Date(interview.submittedAt).toLocaleString()}
                  </p>

                  {/* Optional: You can display the video file here if saved */}
                  {/* <video src="..." controls /> */}
                </div>
              ) : (
                <p className="text-red-600 mt-4">Interview not yet submitted.</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
