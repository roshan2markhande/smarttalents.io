import { useState } from "react";

export default function UploadStudentManager() {
  const [students, setStudents] = useState([]);
  const [manualEntry, setManualEntry] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    stream: "",
    tag: "",
  });

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      const rows = text.split("\n").slice(1); // skip header
      const parsed = rows.map((row) => {
        const [name, email, phone, college, stream, tag] = row.split(",");
        return { name, email, phone, college, stream, tag };
      });
      setStudents((prev) => [...prev, ...parsed]);
    };
    reader.readAsText(file);
  };

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualEntry({ ...manualEntry, [name]: value });
  };

  const addManualStudent = () => {
    setStudents((prev) => [...prev, manualEntry]);
    setManualEntry({
      name: "",
      email: "",
      phone: "",
      college: "",
      stream: "",
      tag: "",
    });
  };

  const assignJob = (studentIndex, jobTitle) => {
    const updated = [...students];
    updated[studentIndex].assignedJob = jobTitle;
    setStudents(updated);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Upload Students</h2>

      {/* Upload CSV */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload CSV</label>
        <input type="file" accept=".csv" onChange={handleCSVUpload} className="mb-2" />
        <p className="text-sm text-gray-500">CSV Format: Name,Email,Phone,College,Stream,Tag</p>
      </div>

      {/* Manual Add */}
      <div className="mt-4 mb-6">
        <h3 className="font-semibold mb-2">Add Manually</h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {["name", "email", "phone", "college", "stream", "tag"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={manualEntry[field]}
              onChange={handleManualChange}
              className="border p-2 rounded"
            />
          ))}
        </div>
        <button
          onClick={addManualStudent}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      {/* List of Uploaded Students */}
      <div>
        <h3 className="font-semibold mb-2">Uploaded Students ({students.length})</h3>
        {students.length === 0 ? (
          <p className="text-gray-500">No students uploaded yet.</p>
        ) : (
          <table className="w-full table-auto border mt-2 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
                <th>Stream</th>
                <th>Tag</th>
                <th>Assigned Job</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-1">{s.name}</td>
                  <td className="border">{s.email}</td>
                  <td className="border">{s.phone}</td>
                  <td className="border">{s.college}</td>
                  <td className="border">{s.stream}</td>
                  <td className="border">{s.tag}</td>
                  <td className="border">
                    {s.assignedJob || (
                      <span className="text-gray-400 italic">None</span>
                    )}
                  </td>
                  <td className="border">
                    <select
                      onChange={(e) => assignJob(idx, e.target.value)}
                      className="p-1 text-sm"
                    >
                      <option>Select Job</option>
                      <option value="Frontend Intern">Frontend Intern</option>
                      <option value="Backend Intern">Backend Intern</option>
                      <option value="Fullstack Developer">Fullstack Developer</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
