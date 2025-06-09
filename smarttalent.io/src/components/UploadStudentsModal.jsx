import { useState } from "react";
import Papa from "papaparse";

export default function UploadStudentsModal({ onClose }) {
  const [students, setStudents] = useState([]);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setStudents(results.data);
      },
    });
  };

  const handleSubmit = () => {
    console.log("Submitted students:", students);
    // TODO: send students to backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-3xl max-h-[90vh] overflow-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Student List (CSV)</h2>
          <button onClick={onClose} className="text-red-600 text-lg font-bold">×</button>
        </div>

        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="mb-4"
        />

        {students.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview ({students.length} entries)</h3>
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(students[0]).map((key) => (
                    <th key={key} className="border px-2 py-1">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((stu, i) => (
                  <tr key={i}>
                    {Object.values(stu).map((val, j) => (
                      <td key={j} className="border px-2 py-1">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
