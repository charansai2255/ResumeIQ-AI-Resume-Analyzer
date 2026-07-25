import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MessageSquare, ArrowRight, Zap, Clock, Briefcase, ChevronRight, History } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { createInterviewQuestions, getInterviewQuestions } from "../../api/interviewQuestions";

function InterviewQuestions() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);

  // Past sessions state
  const [pastSessions, setPastSessions] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Load resumes on mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();
        setResumes(data);
        if (data.length > 0) setResumeId(String(data[0].id));
      } catch {
        toast.error("Failed to load resumes.");
      }
    };
    fetchResumes();
  }, []);

  // Fetch past sessions whenever the selected resume changes
  const fetchHistory = useCallback(async (id) => {
    if (!id) return;
    setHistoryLoading(true);
    setPastSessions([]);
    try {
      const data = await getInterviewQuestions(id);
      setPastSessions(data.data || []);
    } catch {
      // 404 just means no sessions yet — that's fine
      setPastSessions([]);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (resumeId) fetchHistory(resumeId);
  }, [resumeId, fetchHistory]);

  const handleGenerate = async () => {
    if (!jobRole.trim()) { toast.error("Please enter a job role."); return; }
    try {
      setLoading(true);
      const result = await createInterviewQuestions(resumeId, { job_role: jobRole });
      toast.success("Interview Questions Generated!");
      // Navigate with the new session's ID so only this session is shown (no history sidebar)
      const newSessionId = result?.id || result?.data?.id;
      if (newSessionId) {
        navigate(`/interview-questions/result/${resumeId}/${newSessionId}`);
      } else {
        navigate(`/interview-questions/result/${resumeId}`);
      }
    } catch {
      toast.error("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Interview Preparation</h1>
          <p className="text-slate-500 text-sm mt-1.5">Generate AI-crafted interview questions tailored to your role</p>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-pink-500/8 border border-pink-500/20 rounded-xl px-4 py-3.5">
          <Zap size={16} className="text-pink-400 flex-shrink-0 mt-0.5" />
          <p className="text-pink-300/80 text-sm leading-relaxed">
            Our AI analyzes your resume and generates role-specific questions to help you prepare effectively.
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl p-8 shadow-lg hover:shadow-xl hover:border-white/[0.12] transition-all duration-300 space-y-5">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Select Resume</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-pink-500/50 focus:bg-pink-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm shadow-inner cursor-pointer"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id} className="bg-[#0a0b18] text-slate-100">{resume.filename}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Target Job Role</label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full bg-[#05050e]/50 border border-white/[0.07] focus:border-pink-500/50 focus:bg-pink-500/5 text-slate-200 rounded-xl p-4 outline-none transition-all duration-300 text-sm placeholder:text-slate-600 shadow-inner"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 hover:from-pink-500 hover:via-rose-500 hover:to-red-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(236,72,153,0.25)] hover:shadow-[0_6px_25px_rgba(236,72,153,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 text-sm"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
            ) : (
              <><MessageSquare size={16} />Generate Questions <ArrowRight size={15} /></>
            )}
          </button>
        </div>

        {/* Previously Generated Sessions */}
        {resumeId && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <History size={14} className="text-slate-500" />
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Previously Generated</h2>
              {pastSessions.length > 0 && (
                <span className="text-xs bg-pink-500/10 border border-pink-500/20 text-pink-400 font-semibold px-2 py-0.5 rounded-full">
                  {pastSessions.length}
                </span>
              )}
            </div>

            {historyLoading ? (
              <div className="bg-[#0a0b18]/50 border border-white/[0.05] rounded-2xl p-6 flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin flex-shrink-0" />
                <p className="text-slate-500 text-sm">Loading past sessions...</p>
              </div>
            ) : pastSessions.length === 0 ? (
              <div className="bg-[#0a0b18]/40 border border-white/[0.04] rounded-2xl px-5 py-4 text-center">
                <p className="text-slate-600 text-sm">No previously generated sessions for this resume.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pastSessions.map((session, idx) => {
                  const totalQs =
                    (session.technical_questions?.length || 0) +
                    (session.hr_questions?.length || 0) +
                    (session.project_questions?.length || 0) +
                    (session.coding_questions?.length || 0);

                  return (
                    <button
                      key={session.id}
                      onClick={() => navigate(`/interview-questions/result/${resumeId}/${session.id}`)}
                      className="w-full text-left bg-[#0a0b18]/50 border border-white/[0.06] hover:border-pink-500/25 hover:bg-pink-500/5 rounded-2xl px-5 py-4 transition-all duration-200 flex items-center gap-4 group"
                    >
                      <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 flex-shrink-0 group-hover:bg-pink-500/15 transition-colors">
                        <Briefcase size={16} className="text-pink-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors truncate">
                          {session.job_role || `Session ${pastSessions.length - idx}`}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock size={10} /> {formatDate(session.created_at)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs bg-white/[0.04] border border-white/[0.06] text-slate-400 font-medium px-2.5 py-1 rounded-full">
                          {totalQs} questions
                        </span>
                        <ChevronRight size={15} className="text-slate-500 group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default InterviewQuestions;