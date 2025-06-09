import { useState } from "react";

export default function JobPostModal({ onClose, onSave }) {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    role: "",
    timeLimit: 30,
    mcqs: Array(20).fill({ question: "", options: ["", "", "", ""], answer: "" }),
    coding: Array(2).fill({ question: "", description: "" }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMCQChange = (index, field, value, optionIndex = null) => {
    const updated = [...jobData.mcqs];
    if (field === "options") {
      updated[index].options[optionIndex] = value;
    } else {
      updated[index][field] = value;
    }
    setJobData((prev) => ({ ...prev, mcqs: updated }));
  };

  const handleCodingChange = (index, field, value) => {
    const updated = [...jobData.coding];
    updated[index][field] = value;
    setJobData((prev) => ({ ...prev, coding: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(jobData); // Save to backend or state
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-4xl h-[90vh] overflow-y-auto rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Job Post</h2>
          <button onClick={onClose} className="text-red-600 font-bold text-lg">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Job Title</label>
            <input type="text" name="title" className="w-full border p-2" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label>Description</label>
            <textarea name="description" className="w-full border p-2" rows={3} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label>Role</label>
            <input type="text" name="role" className="w-full border p-2" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label>Time Limit (mins)</label>
            <input type="number" name="timeLimit" className="w-full border p-2" onChange={handleChange} value={jobData.timeLimit} />
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">MCQ Questions (20)</h3>
          {jobData.mcqs.map((mcq, i) => (
            <div key={i} className="mb-4 border p-3 rounded">
              <label>Q{i + 1}</label>
              <input
                type="text"
                placeholder="Question"
                className="w-full border mb-2 p-1"
                value={mcq.question}
                onChange={(e) => handleMCQChange(i, "question", e.target.value)}
              />
              {mcq.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  placeholder={`Option ${j + 1}`}
                  className="w-full border mb-1 p-1"
                  value={opt}
                  onChange={(e) => handleMCQChange(i, "options", e.target.value, j)}
                />
              ))}
              <input
                type="text"
                placeholder="Correct Answer"
                className="w-full border p-1"
                value={mcq.answer}
                onChange={(e) => handleMCQChange(i, "answer", e.target.value)}
              />
            </div>
          ))}

          <h3 className="text-lg font-semibold mt-6 mb-2">Coding Questions (2)</h3>
          {jobData.coding.map((q, i) => (
            <div key={i} className="mb-4 border p-3 rounded">
              <label>Q{i + 1}</label>
              <input
                type="text"
                placeholder="Question"
                className="w-full border mb-2 p-1"
                value={q.question}
                onChange={(e) => handleCodingChange(i, "question", e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full border p-1"
                value={q.description}
                onChange={(e) => handleCodingChange(i, "description", e.target.value)}
              />
            </div>
          ))}

          <div className="mt-6 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
