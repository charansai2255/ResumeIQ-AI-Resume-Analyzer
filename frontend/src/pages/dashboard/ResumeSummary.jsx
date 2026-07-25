import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ScrollText, ArrowRight, Sparkles } from "lucide-react";

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
        if (data.length > 0) setResumeId(data[0].id);
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
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Resume Summary</h1>
          <p className="text-slate-500 text-sm mt-1.5">Generate a concise AI-powered professional summary</p>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-indigo-500/8 border border-indigo-500/20 rounded-xl px-4 py-3.5">
          <Sparkles size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-indigo-300/80 text-sm leading-relaxed">
            Our AI reads your resume and generates a polished professional summary you can use on LinkedIn or your portfolio.
          </p>
        </div>

        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl p-8 shadow-lg hover:shadow-xl hover:border-white/[0.12] transition-all duration-300 space-y-5">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Select Resume</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-indigo-500/50 focus:bg-indigo-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm shadow-inner cursor-pointer"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id} className="bg-[#0a0b18] text-slate-100">
                  {resume.filename}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-5 space-y-3">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">What you'll get</p>
            {["A concise 2–3 paragraph professional summary", "Highlights your key skills and experience", "Optimized for LinkedIn and job applications"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-indigo-200/80 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 animate-pulse" />
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || resumes.length === 0}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:via-blue-500 hover:to-cyan-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 text-sm mt-4"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
            ) : (
              <><ScrollText size={16} />Generate Summary <ArrowRight size={15} /></>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResumeSummary;