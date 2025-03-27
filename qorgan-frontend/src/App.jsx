import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CasesPage from "./pages/CasesPage";
import ReportFraud from "./pages/ReportFraud";
import CaseTracking from "./pages/CaseTracking";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import Approval from "./pages/adminApproval";
import AdminRegister from "./pages/AdminRegister";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-[90vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/cases" element={<CasesPage />} />
          <Route path="/report" element={<ReportFraud />} />
          <Route path="/cases" element={<CaseTracking />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/approval" element={<Approval />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
