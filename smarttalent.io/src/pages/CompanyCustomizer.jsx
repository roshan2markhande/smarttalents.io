import { useState, useEffect } from "react";
import { Palette, Eye, EyeOff, Upload, Save } from "lucide-react";

export default function CompanyCustomizer() {
  const [companyName, setCompanyName] = useState("");
  const [theme, setTheme] = useState("light");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [showLogo, setShowLogo] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("companySettings");
    if (saved) {
      const settings = JSON.parse(saved);
      setCompanyName(settings.name || "");
      setTheme(settings.theme || "light");
      setLogoPreview(settings.logo || null);
      setShowLogo(settings.showLogo !== false);
    }
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const companySettings = {
      name: companyName,
      theme,
      logo: logoPreview,
      showLogo,
    };
    localStorage.setItem("companySettings", JSON.stringify(companySettings));
    try {
      const formData = new FormData();
      formData.append("name", companyName);
      formData.append("theme", theme);
      formData.append("showLogo", showLogo);
      if (logo) formData.append("logo", logo);

      await fetch("http://localhost:5000/api/company/customize", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Failed to save to backend", err);
    }
    alert("Company Settings Saved!");
  };

  const handleAISuggest = () => {
    const suggestions = [
      "Try a dark theme with a modern sans-serif font for a tech feel.",
      "Use a blue theme with logo hidden for a clean minimalist look.",
      "Show your company logo prominently for better branding.",
    ];
    const random = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion(random);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Palette className="text-blue-600" /> Customize Your Company
      </h2>

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
        <label className="block font-semibold flex items-center gap-2">
          <Upload size={16} /> Upload Logo:
        </label>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        {logoPreview && showLogo && (
          <img src={logoPreview} alt="Logo Preview" className="h-20 mt-2" />
        )}
        <button
          onClick={() => setShowLogo(!showLogo)}
          className="mt-2 text-sm flex items-center gap-1 text-blue-600 hover:underline"
        >
          {showLogo ? <EyeOff size={16} /> : <Eye size={16} />} {showLogo ? "Hide Logo" : "Show Logo"}
        </button>
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
          <option value="corporate">Corporate</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          onClick={handleAISuggest}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ✨ AI Suggest Custom Look
        </button>
        {aiSuggestion && (
          <p className="mt-2 text-sm text-gray-600 italic">💡 {aiSuggestion}</p>
        )}
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
      >
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
