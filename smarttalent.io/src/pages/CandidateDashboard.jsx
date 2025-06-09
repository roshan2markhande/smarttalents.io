import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CandidateDashboard() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jobList = JSON.parse(localStorage.getItem("jobPosts")) || [];
    setJobs(jobList);
  }, []);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeFile(file);

    const reader = new FileReader();
    reader.onload = () => setResumePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleApply = (jobId) => {
    if (!resumeFile) {
      alert("Please upload your resume before applying.");
      return;
    }

    // Store candidate submission locally
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const updated = [
      ...applications,
      {
        jobId,
        resume: resumePreview,
        appliedAt: new Date().toISOString(),
        id: Date.now(),
      },
    ];
    localStorage.setItem("applications", JSON.stringify(updated));

    // Go to interview page
    navigate(`/interview/start/${jobId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>

      {/* Upload Resume */}
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <label className="block font-semibold mb-2">Upload Resume (PDF preferred):</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
        {resumeFile && <p className="text-green-600 mt-2">Resume Uploaded ✅</p>}
      </div>

      {/* Job List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
        {jobs.map((job) => (
          <div key={job.id} className="border rounded p-4 mb-4 bg-white shadow">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p>{job.description}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => handleApply(job.id)}
            >
              Apply / Take Interview
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
