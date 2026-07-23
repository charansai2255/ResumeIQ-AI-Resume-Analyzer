import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import UploadResume from "../pages/dashboard/UploadResume";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ResumeHistory from "../pages/dashboard/ResumeHistory";
import ATSAnalysis from "../pages/dashboard/ATSAnalysis";
import ATSResult from "../pages/dashboard/ATSResult";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
              <ProtectedRoute>
                 <ResumeHistory />
              </ProtectedRoute>
           }
        />
<Route
  path="/ats-analysis"
  element={
    <ProtectedRoute>
      <ATSAnalysis />
    </ProtectedRoute>
  }
/>

<Route
  path="/analysis/result/:resumeId"
  element={
    <ProtectedRoute>
      <ATSResult />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}