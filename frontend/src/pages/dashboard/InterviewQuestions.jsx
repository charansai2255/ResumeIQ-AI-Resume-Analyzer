import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { createInterviewQuestions } from "../../api/interviewQuestions";

function InterviewQuestions() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getResumes();

      setResumes(data);

      if (data.length > 0) {
        setResumeId(data[0].id);
      }
    } catch {
      toast.error("Failed to load resumes.");
    }
  };

  const handleGenerate = async () => {
    if (!jobRole.trim()) {
      toast.error("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);

      await createInterviewQuestions(resumeId, {
        job_role: jobRole,
      });

      toast.success("Interview Questions Generated!");

      navigate(`/interview-questions/result/${resumeId}`);
    } catch {
      toast.error("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Interview Questions
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">

        <div>
          <label className="font-semibold">
            Select Resume
          </label>

          <select
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            {resumes.map((resume) => (
              <option
                key={resume.id}
                value={resume.id}
              >
                {resume.filename}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Job Role
          </label>

          <input
            type="text"
            placeholder="Full Stack Developer"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Generating..."
            : "Generate Questions"}
        </button>

      </div>

    </DashboardLayout>
  );
}

export default InterviewQuestions;