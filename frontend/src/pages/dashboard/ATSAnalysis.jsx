import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, BarChart3 } from "lucide-react";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { analyzeResume } from "../../api/analysis";

function ATSAnalysis() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();
        setResumes(data);
      } catch (error) {
        toast.error("Failed to load resumes.");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleAnalyze = async (resumeId) => {
    try {
      setAnalyzingId(resumeId);

      await analyzeResume(resumeId);

      toast.success("Analysis generated successfully!");

      navigate(`/analysis/result/${resumeId}`);
    } catch (error) {
      toast.error("Analysis failed.");
    } finally {
      setAnalyzingId(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center mt-10">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        ATS Analysis
      </h1>

      {resumes.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <FileText
            size={60}
            className="mx-auto text-gray-400 mb-4"
          />

          <h2 className="text-2xl font-semibold">
            No Resume Found
          </h2>

          <p className="text-gray-500 mt-2">
            Upload a resume first.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <FileText
                  size={40}
                  className="text-blue-600"
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {resume.filename}
                  </h2>

                  <p className="text-gray-500">
                    Uploaded{" "}
                    {new Date(
                      resume.uploaded_at
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleAnalyze(resume.id)}
                disabled={analyzingId === resume.id}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
              >
                <BarChart3 size={18} />

                {analyzingId === resume.id
                  ? "Analyzing..."
                  : "Analyze"}
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default ATSAnalysis;