import { useState } from "react";

export default function InvitationSender() {
  const [job, setJob] = useState("");
  const [students, setStudents] = useState([
    {
      name: "Ravi Mehra",
      email: "ravi@example.com",
      phone: "+918888888888",
      tag: "B.Tech CSE",
    },
    {
      name: "Priya Kulkarni",
      email: "priya@example.com",
      phone: "+919999999999",
      tag: "B.Sc IT",
    },
  ]);
  const [selectedChannels, setSelectedChannels] = useState({
    email: true,
    whatsapp: false,
    linkedin: false,
  });
  const [deadline, setDeadline] = useState("");

  const handleSendInvites = () => {
    if (!job || !deadline) {
      alert("Please select job and deadline.");
      return;
    }

    const selected = students.map((s) => ({
      ...s,
      job,
      deadline,
      channels: Object.keys(selectedChannels).filter((ch) => selectedChannels[ch]),
    }));

    console.log("Sending invites to:", selected);

    // TODO: Connect to backend/integration
    alert(`Invitations sent to ${students.length} student(s)!`);
  };

  const toggleChannel = (channel) => {
    setSelectedChannels({ ...selectedChannels, [channel]: !selectedChannels[channel] });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">📤 Send Test Invitations</h2>

      {/* Job Selection + Deadline */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <select
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Job</option>
          <option>Frontend Intern</option>
          <option>Backend Developer</option>
          <option>Java Fullstack</option>
        </select>

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 border rounded"
          placeholder="Set deadline"
        />
      </div>

      {/* Channel Selection */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Select Channels</h4>
        <label className="flex gap-2 mb-1">
          <input
            type="checkbox"
            checked={selectedChannels.email}
            onChange={() => toggleChannel("email")}
          />
          Email
        </label>
        <label className="flex gap-2 mb-1">
          <input
            type="checkbox"
            checked={selectedChannels.whatsapp}
            onChange={() => toggleChannel("whatsapp")}
          />
          WhatsApp
        </label>
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={selectedChannels.linkedin}
            onChange={() => toggleChannel("linkedin")}
          />
          LinkedIn
        </label>
      </div>

      {/* Preview */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Students Receiving Invite</h4>
        <ul className="text-sm text-gray-700 list-disc ml-6">
          {students.map((s, idx) => (
            <li key={idx}>
              {s.name} – {s.email} – {s.tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSendInvites}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
      >
        Send Invitations
      </button>
    </div>
  );
}
