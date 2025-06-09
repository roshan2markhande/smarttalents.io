import { useState } from "react";

export default function CommunicationLogs() {
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
    {
      id: 3,
      studentName: "Arjun Patil",
      email: "arjun@example.com",
      job: "Java Role",
      status: "Completed",
      lastSent: "2025-05-30 09:15",
      followUps: ["Asked about next round on 2025-06-06"],
    },
  ]);

  const resendInvite = (id) => {
    alert(`Resend invite for log id: ${id}`);
    // TODO: Integrate actual resend API call here
  };

  const exportCSV = () => {
    const csvRows = [];
    // headers
    csvRows.push("Student Name,Email,Job,Status,Last Sent,Follow Ups");
    logs.forEach(({ studentName, email, job, status, lastSent, followUps }) => {
      csvRows.push(
        `"${studentName}","${email}","${job}","${status}","${lastSent}","${followUps.join(
          "; "
        )}"`
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
      <h2 className="text-xl font-bold text-blue-800 mb-4">📬 Communication Logs & Export</h2>

      <button
        onClick={exportCSV}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Export CSV
      </button>

      <table className="w-full border-collapse border border-gray-300">
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
            <tr key={log.id} className="text-center">
              <td className="border border-gray-300 p-2">{log.studentName}</td>
              <td className="border border-gray-300 p-2">{log.email}</td>
              <td className="border border-gray-300 p-2">{log.job}</td>
              <td className="border border-gray-300 p-2">{log.status}</td>
              <td className="border border-gray-300 p-2">{log.lastSent}</td>
              <td className="border border-gray-300 p-2 text-left">
                {log.followUps.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {log.followUps.map((fu, idx) => (
                      <li key={idx}>{fu}</li>
                    ))}
                  </ul>
                ) : (
                  <em>No follow ups</em>
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => resendInvite(log.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Resend Invite
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
