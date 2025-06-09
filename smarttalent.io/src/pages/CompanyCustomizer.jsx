import { useState } from "react";

export default function CompanyCustomizer() {
  const [companyName, setCompanyName] = useState("");
  const [theme, setTheme] = useState("light");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const companySettings = {
      name: companyName,
      theme,
      logo: logoPreview,
    };
    localStorage.setItem("companySettings", JSON.stringify(companySettings));
    alert("Company Settings Saved!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Customize Your Company</h2>

      <div className="mb-4">
        <label className="block font-semibold">Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Upload Logo:</label>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        {logoPreview && (
          <img src={logoPreview} alt="Logo Preview" className="h-20 mt-2" />
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Select Theme:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
}
