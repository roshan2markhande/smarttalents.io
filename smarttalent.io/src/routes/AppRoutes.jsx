import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyLogin from "../pages/CompanyLogin";
import Apply from "../pages/Apply";
import Interview from "../pages/Interview";
import CompanyCustomizer from "../pages/CompanyCustomizer";
import CompanyDashboard from "../pages/CompanyDashboard";
import JobQuestions from "../pages/JobQuestions";
import CandidateDashboard from "../pages/CandidateDashboard";
import InterviewPage from "../pages/InterviewPage";
import Home from "../pages/Home";
import CompanyRegister from "../pages/CompanyRegister";


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/company/customize" element={<CompanyCustomizer />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/dashboard/questions/:jobId" element={<JobQuestions />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/interview/start/:jobId" element={<InterviewPage />} />


      </Routes>
    </Router>
  );
}