import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JobQuestions() {
  const { jobId } = useParams();
  const [jobTitle, setJobTitle] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [codes, setCodes] = useState([]);
  const [mcq, setMcq] = useState({ question: "", options: ["", "", "", ""], answer: "" });
  const [code, setCode] = useState({ question: "", solution: "" });

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobPosts")) || [];
    const job = jobs.find((j) => j.id == jobId);
    if (job) setJobTitle(job.title);

    const qbank = JSON.parse(localStorage.getItem(`questions-${jobId}`)) || {
      mcqs: [],
      codes: [],
    };
    setMcqs(qbank.mcqs);
    setCodes(qbank.codes);
  }, [jobId]);

  const saveAll = (newMcqs, newCodes) => {
    const updated = { mcqs: newMcqs, codes: newCodes };
    localStorage.setItem(`questions-${jobId}`, JSON.stringify(updated));
  };

  const addMcq = () => {
    if (mcqs.length >= 20) return alert("Maximum 20 MCQs allowed");
    const newMcqs = [...mcqs, mcq];
    setMcqs(newMcqs);
    saveAll(newMcqs, codes);
    setMcq({ question: "", options: ["", "", "", ""], answer: "" });
  };

  const addCode = () => {
    if (codes.length >= 2) return alert("Maximum 2 coding questions allowed");
    const newCodes = [...codes, code];
    setCodes(newCodes);
    saveAll(mcqs, newCodes);
    setCode({ question: "", solution: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Questions for: {jobTitle}</h1>

      {/* MCQ Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">MCQs ({mcqs.length}/20)</h2>
        <input
          type="text"
          placeholder="MCQ Question"
          value={mcq.question}
          onChange={(e) => setMcq({ ...mcq, question: e.target.value })}
          className="border w-full p-2 mb-2"
        />
        {mcq.options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...mcq.options];
              newOpts[i] = e.target.value;
              setMcq({ ...mcq, options: newOpts });
            }}
            className="border w-full p-2 mb-2"
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer (must match one option)"
          value={mcq.answer}
          onChange={(e) => setMcq({ ...mcq, answer: e.target.value })}
          className="border w-full p-2 mb-2"
        />
        <button
          onClick={addMcq}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add MCQ
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {mcqs.map((q, idx) => (
            <div key={idx}>
              {idx + 1}. {q.question}
            </div>
          ))}
        </div>
      </div>

      {/* Coding Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Coding Questions ({codes.length}/2)</h2>
        <textarea
          placeholder="Problem Statement"
          value={code.question}
          onChange={(e) => setCode({ ...code, question: e.target.value })}
          className="border w-full p-2 mb-2 h-24"
        />
        <textarea
          placeholder="Solution Code (for reference)"
          value={code.solution}
          onChange={(e) => setCode({ ...code, solution: e.target.value })}
          className="border w-full p-2 mb-2 h-24"
        />
        <button
          onClick={addCode}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Coding Question
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {codes.map((q, idx) => (
            <div key={idx}>
              {idx + 1}. {q.question.slice(0, 80)}...
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
