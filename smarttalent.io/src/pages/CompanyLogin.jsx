import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Moon, Sun , Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import loginImage from "../assets/login-gif.gif"; // ✅ fixed image import
import { FcGoogle } from "react-icons/fc";
export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegistering && password !== confirmPassword) {
      setError(t("password_mismatch"));
      return;
    }

    try {
      const url = isRegistering
        ? "http://localhost:5000/api/company/register"
        : "http://localhost:5000/api/company/login";

      const res = await axios.post(url, { email, password });
      localStorage.setItem("companyToken", res.data.token);
      navigate("/company/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || t("generic_error"));
    }
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "en" ? "hi" : "en");
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen flex transition bg-gray-100 dark:bg-gray-900">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 dark:text-white">
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">
                {isRegistering ? t("register") : t("login")}
              </h2>
              <div className="flex gap-3 items-center">
                <button onClick={() =>  (!darkMode)}>
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={toggleLang}
                  className="text-sm underline text-blue-500"
                >
                  {i18n.language === "en" ? "हिंदी" : "EN"}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {isRegistering ? t("create_account_desc") : t("login_desc")}
            </p>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-sm">{t("email")}</label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded dark:bg-gray-800 dark:border-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 relative">
                <label className="block mb-1 text-sm">{t("password")}</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border px-4 py-2 rounded pr-10 dark:bg-gray-800 dark:border-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {isRegistering && (
                <div className="mb-4">
                  <label className="block mb-1 text-sm">{t("confirm_password")}</label>
                  <input
                    type="password"
                    className="w-full border px-4 py-2 rounded dark:bg-gray-800 dark:border-gray-700"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {!isRegistering && (
                <div className="text-right mb-4">
                  <a href="/forgot-password" className="text-blue-600 text-sm underline">
                    {t("forgot_password")}
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isRegistering ? t("register") : t("login")}
              </button>
            </form>

            <div className="text-sm text-center mt-6">
              {isRegistering ? t("have_account") : t("no_account")}{" "}
              <button
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError("");
                }}
                className="text-blue-600 underline"
              >
                {isRegistering ? t("login") : t("register")}
              </button>
            </div>

            {/* Social logins */}
            <div className="mt-6">
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-3">
                {t("or_continue")}
              </p>
              <div className="flex gap-4 justify-center">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded shadow dark:bg-gray-800 dark:border-gray-700">
                  <FcGoogle size={18} /> Google
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded shadow dark:bg-gray-800 dark:border-gray-700">
                  <Linkedin size={18} /> LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="hidden md:block w-1/2">
          <img
            src={loginImage}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
