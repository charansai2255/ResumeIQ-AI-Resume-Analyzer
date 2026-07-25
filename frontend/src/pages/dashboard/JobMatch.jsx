import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { matchResume } from "../../api/jobMatch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Briefcase, ArrowRight } from "lucide-react";

function JobMatch() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
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

  const handleMatch = async () => {
    if (!jobDescription.trim()) { toast.error("Please enter a Job Description."); return; }
    try {
      setLoading(true);
      await matchResume(resumeId, jobDescription);
      toast.success("Job Match Generated!");
      navigate(`/job-match/result/${resumeId}`);
    } catch {
      toast.error("Job Match Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Job Match Analysis</h1>
          <p className="text-slate-500 text-sm mt-1.5">See how well your resume aligns with a job description</p>
        </div>

        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl p-8 shadow-lg hover:shadow-xl hover:border-white/[0.12] transition-all duration-300 space-y-6">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Select Resume</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-purple-500/50 focus:bg-purple-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm shadow-inner cursor-pointer"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id} className="bg-[#0a0b18] text-slate-100">
                  {resume.filename}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Job Description</label>
            <textarea
              rows="10"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here..."
              className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-purple-500/50 focus:bg-purple-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm placeholder:text-slate-600 resize-none shadow-inner"
            />
          </div>

          <button
            onClick={handleMatch}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(147,51,234,0.25)] hover:shadow-[0_6px_25px_rgba(147,51,234,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 text-sm"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Matching...</>
            ) : (
              <><Briefcase size={16} />Match Resume <ArrowRight size={15} /></>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default JobMatch;