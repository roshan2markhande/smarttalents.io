import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function InterviewPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [mcqs, setMcqs] = useState([]);
  const [codes, setCodes] = useState([]);
  const [answers, setAnswers] = useState({ mcq: [], code: [] });
  const [step, setStep] = useState("mcq"); // mcq → code → done

  const videoRef = useRef(null);
const mediaRecorderRef = useRef(null);
const [recordedChunks, setRecordedChunks] = useState([]);
useEffect(() => {
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        setRecordedChunks(chunks);
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Recording failed", err);
      alert("Camera/Mic access is required for the interview.");
    }
  };

  startRecording();
}, []);


  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem(`questions-${jobId}`)) || {};
    setMcqs(questions.mcqs || []);
    setCodes(questions.codes || []);
    setAnswers({
      mcq: new Array(questions.mcqs?.length || 0).fill(""),
      code: new Array(questions.codes?.length || 0).fill(""),
    });
  }, [jobId]);

  const handleMcqChange = (index, value) => {
    const updated = [...answers.mcq];
    updated[index] = value;
    setAnswers((prev) => ({ ...prev, mcq: updated }));
  };

  const handleCodeChange = (index, value) => {
    const updated = [...answers.code];
    updated[index] = value;
    setAnswers((prev) => ({ ...prev, code: updated }));
  };

  const submitInterview = () => {
    const submissions = JSON.parse(localStorage.getItem("interviewSubmissions")) || [];
    submissions.push({
      jobId,
      answers,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem("interviewSubmissions", JSON.stringify(submissions));
    alert("Interview submitted successfully!");
    navigate("/candidate");
    const submitInterview = () => {
  const submissions = JSON.parse(localStorage.getItem("interviewSubmissions")) || [];
  submissions.push({
    jobId,
    answers,
    submittedAt: new Date().toISOString(),
  });
  localStorage.setItem("interviewSubmissions", JSON.stringify(submissions));

  // Stop recording
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
  }

  setTimeout(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `interview-${jobId}.webm`;
      a.click();
    }
    alert("Interview and video submitted successfully!");
    navigate("/candidate");
  }, 1000);
};

  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interview for Job ID: {jobId}</h1>

      {step === "mcq" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">MCQ Section</h2>
          {mcqs.map((q, idx) => (
            <div key={idx} className="mb-4 border p-4 rounded bg-white shadow">
              <p className="font-semibold">
                Q{idx + 1}: {q.question}
              </p>
              {q.options.map((opt, oidx) => (
                <label key={oidx} className="block mt-1">
                  <input
                    type="radio"
                    name={`mcq-${idx}`}
                    value={opt}
                    checked={answers.mcq[idx] === opt}
                    onChange={(e) => handleMcqChange(idx, e.target.value)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
            
          ))}
<div className="mb-6">
  <h2 className="text-lg font-bold mb-2">🎥 Video Recording in Progress...</h2>
  <video ref={videoRef} autoPlay muted className="w-full max-w-md rounded shadow" />
</div>

          <button
            onClick={() => setStep("code")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Next: Coding Section
          </button>
        </div>
      )}

      {step === "code" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Coding Section</h2>
          {codes.map((q, idx) => (
            <div key={idx} className="mb-6">
              <p className="font-semibold">Q{idx + 1}: {q.question}</p>
              <textarea
                placeholder="Your solution here..."
                value={answers.code[idx]}
                onChange={(e) => handleCodeChange(idx, e.target.value)}
                className="w-full p-2 border rounded h-40 mt-2"
              />
            </div>
          ))}

          <button
            onClick={submitInterview}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Interview
          </button>
        </div>
      )}
    </div>
  );
}
