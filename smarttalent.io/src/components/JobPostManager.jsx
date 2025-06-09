import { useState } from "react";

export default function JobPostManager() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    role: "",
    duration: "",
    mcqs: [],
    codingQuestions: [],
  });

  const [newMCQ, setNewMCQ] = useState("");
  const [newCodeQ, setNewCodeQ] = useState("");

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const addMCQ = () => {
    if (newMCQ.trim()) {
      setJob({ ...job, mcqs: [...job.mcqs, newMCQ] });
      setNewMCQ("");
    }
  };

  const addCodingQuestion = () => {
    if (newCodeQ.trim()) {
      setJob({ ...job, codingQuestions: [...job.codingQuestions, newCodeQ] });
      setNewCodeQ("");
    }
  };

  const handleSubmit = () => {
    console.log("Job Posted:", job);
    // TODO: Send job to backend
    alert("Job posted successfully!");
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Post New Job</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["title", "role", "duration"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={job[field]}
            onChange={handleJobChange}
            className="border p-2 rounded"
          />
        ))}
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleJobChange}
          rows={3}
          className="col-span-2 border p-2 rounded"
        />
      </div>

      {/* MCQ Input */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add MCQ Questions (20 max)</h3>
        <div className="flex gap-2 mb-2">
          <input
            value={newMCQ}
            onChange={(e) => setNewMCQ(e.target.value)}
            placeholder="Enter MCQ"
            className="flex-1 border p-2 rounded"
          />
          <button onClick={addMCQ} className="bg-blue-600 text-white px-4 rounded">
            Add
          </button>
        </div>
        <ul className="list-decimal ml-6 text-sm text-gray-700">
          {job.mcqs.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>

      {/* Coding Questions */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add Coding Questions (2 max)</h3>
        <div className="flex gap-2 mb-2">
          <input
            value={newCodeQ}
            onChange={(e) => setNewCodeQ(e.target.value)}
            placeholder="Enter Coding Question"
            className="flex-1 border p-2 rounded"
          />
          <button onClick={addCodingQuestion} className="bg-blue-600 text-white px-4 rounded">
            Add
          </button>
        </div>
        <ul className="list-decimal ml-6 text-sm text-gray-700">
          {job.codingQuestions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>

      {/* Smart AI Suggestion (UI placeholder) */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">💡 Smart Question Suggestion (AI)</h3>
        <p className="text-sm text-gray-500 mb-2">Select skill to auto-generate questions:</p>
        <select className="border p-2 rounded w-full mb-2">
          <option>React</option>
          <option>Java</option>
          <option>Python</option>
          <option>Communication</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Generate Questions (Coming Soon)
        </button>
      </div>

      {/* Submit Job */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded"
        >
          Post Job
        </button>
      </div>
    </div>
  );
}
