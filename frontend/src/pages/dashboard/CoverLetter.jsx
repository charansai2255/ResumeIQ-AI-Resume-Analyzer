import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FileSignature, ArrowRight } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { createCoverLetter } from "../../api/coverLetter";

function CoverLetter() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
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

  const handleGenerate = async () => {
    if (!companyName || !jobTitle || !jobDescription) { toast.error("Please fill all fields."); return; }
    try {
      setLoading(true);
      await createCoverLetter(resumeId, { company_name: companyName, job_title: jobTitle, job_description: jobDescription });
      toast.success("Cover Letter Generated!");
      navigate(`/cover-letter/result/${resumeId}`);
    } catch {
      toast.error("Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Cover Letter Generator</h1>
          <p className="text-slate-500 text-sm mt-1.5">Generate a personalized AI cover letter for any job</p>
        </div>

        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl p-8 shadow-lg hover:shadow-xl hover:border-white/[0.12] transition-all duration-300 space-y-5">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Select Resume</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-orange-500/50 focus:bg-orange-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm shadow-inner cursor-pointer"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id} className="bg-[#0a0b18] text-slate-100">{resume.filename}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-orange-500/50 focus:bg-orange-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm placeholder:text-slate-600 shadow-inner"
                placeholder="e.g. Google"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-orange-500/50 focus:bg-orange-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm placeholder:text-slate-600 shadow-inner"
                placeholder="e.g. Software Engineer"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Job Description</label>
            <textarea
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-orange-500/50 focus:bg-orange-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm placeholder:text-slate-600 resize-none shadow-inner"
              placeholder="Paste the complete job description here..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 text-sm"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
            ) : (
              <><FileSignature size={16} />Generate Cover Letter <ArrowRight size={15} /></>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CoverLetter;