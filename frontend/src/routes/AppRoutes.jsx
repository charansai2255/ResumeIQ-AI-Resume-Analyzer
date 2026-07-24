import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import UploadResume from "../pages/dashboard/UploadResume";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ResumeHistory from "../pages/dashboard/ResumeHistory";
import ATSAnalysis from "../pages/dashboard/ATSAnalysis";
import ATSResult from "../pages/dashboard/ATSResult";
import JobMatch from "../pages/dashboard/JobMatch";
import JobMatchResult from "../pages/dashboard/JobMatchResult";
import CoverLetter from "../pages/dashboard/CoverLetter";
import CoverLetterResult from "../pages/dashboard/CoverLetterResult";
import ResumeSummary from "../pages/dashboard/ResumeSummary";
import ResumeSummaryResult from "../pages/dashboard/ResumeSummaryResult";
import InterviewQuestions from "../pages/dashboard/InterviewQuestions";
import InterviewQuestionsResult from "../pages/dashboard/InterviewQuestionsResult";

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

<Route
  path="/job-match"
  element={
    <ProtectedRoute>
      <JobMatch />
    </ProtectedRoute>
  }
/>

<Route
  path="/job-match/result/:resumeId"
  element={
    <ProtectedRoute>
      <JobMatchResult />
    </ProtectedRoute>
  }
/>

<Route
  path="/cover-letter"
  element={
    <ProtectedRoute>
      <CoverLetter />
    </ProtectedRoute>
  }
/>

<Route
  path="/cover-letter/result/:resumeId"
  element={
    <ProtectedRoute>
      <CoverLetterResult />
    </ProtectedRoute>
  }
/>

<Route
  path="/resume-summary"
  element={
    <ProtectedRoute>
      <ResumeSummary />
    </ProtectedRoute>
  }
/>

<Route
  path="/resume-summary/result/:resumeId"
  element={
    <ProtectedRoute>
      <ResumeSummaryResult />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview"
  element={
    <ProtectedRoute>
      <InterviewQuestions />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview-questions/result/:resumeId"
  element={
    <ProtectedRoute>
      <InterviewQuestionsResult />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}