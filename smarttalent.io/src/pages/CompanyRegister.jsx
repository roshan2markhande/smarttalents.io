import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompanyRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    passwordHash: "",
    logo: null, // Not handled yet
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("passwordHash", form.passwordHash);
      if (form.logo) {
        formData.append("logo", form.logo);
      }
      formData.append("branding[primaryColor]", "#1e2a38");
      formData.append("branding[secondaryColor]", "#2e3a49");
      formData.append("branding[fontFamily]", "Arial, sans-serif");

      console.log(formData);
      const res = await axios.post(
        "http://localhost:5000/api/company/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("companyToken", res.data.token);
      navigate("/company/dashboard");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please check your inputs.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Company Registration</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="passwordHash"
            value={form.passwordHash}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Company Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
