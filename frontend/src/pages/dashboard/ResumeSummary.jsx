import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { createResumeSummary } from "../../api/resumeSummary";

function ResumeSummary() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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

    fetchResumes();
  }, []);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      await createResumeSummary(resumeId);

      toast.success("Resume Summary Generated!");

      navigate(`/resume-summary/result/${resumeId}`);
    } catch {
      toast.error("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Resume Summary
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
              <option key={resume.id} value={resume.id}>
                {resume.filename}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>
    </DashboardLayout>
  );
}

export default ResumeSummary;