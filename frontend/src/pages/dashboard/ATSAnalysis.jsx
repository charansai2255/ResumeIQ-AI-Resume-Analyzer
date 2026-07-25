import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, BarChart3, Clock, AlertCircle } from "lucide-react";
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
      } catch {
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
    } catch {
      toast.error("Analysis failed.");
    } finally {
      setAnalyzingId(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-80">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-indigo-500/50 border-t-indigo-400 rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm font-medium">Loading resumes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">ATS Analysis</h1>
          <p className="text-slate-500 text-sm mt-1.5">Analyze your resume against Applicant Tracking Systems</p>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-[#0a0b18]/70 border border-white/[0.05] rounded-2xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertCircle size={32} className="text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit mb-2 tracking-tight">Your vault is empty</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto leading-relaxed">Please upload a resume first to start the ATS analysis.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="group bg-[#0a0b18]/70 border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="bg-indigo-500/10 border border-indigo-500/25 p-3.5 rounded-xl text-indigo-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <FileText size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors font-outfit truncate tracking-wide">{resume.filename}</h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock size={12} className="text-slate-500" />
                      <p className="text-xs text-slate-400">
                        {new Date(resume.uploaded_at).toLocaleString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAnalyze(resume.id)}
                  disabled={analyzingId === resume.id}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl transition duration-300 shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_18px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 whitespace-nowrap text-sm flex-shrink-0"
                >
                  {analyzingId === resume.id ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyzing...</>
                  ) : (
                    <><BarChart3 size={16} />Analyze</>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ATSAnalysis;