import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Code2, Users, FolderGit2, Laptop2, MessageSquare, Clock, Briefcase, ChevronRight } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getInterviewQuestions } from "../../api/interviewQuestions";

const categoryConfig = {
  technical_questions: { title: "Technical Questions", icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  hr_questions:        { title: "HR Questions",         icon: Users, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  project_questions:   { title: "Project Questions",    icon: FolderGit2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  coding_questions:    { title: "Coding Questions",     icon: Laptop2, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
};

function QuestionCard({ categoryKey, questions }) {
  const cfg = categoryConfig[categoryKey];
  const Icon = cfg.icon;

  return (
    <div className="group bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:border-white/[0.12] transition-all duration-300">
      <div className={`flex items-center gap-3 px-8 py-5 border-b border-white/[0.05] ${cfg.bg} relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent group-hover:animate-shimmer`} />
        <div className={`p-2 rounded-xl ${cfg.bg} border ${cfg.border} relative z-10`}>
          <Icon size={18} className={cfg.color} />
        </div>
        <h2 className={`text-lg font-bold font-outfit tracking-tight ${cfg.color} relative z-10`}>{cfg.title}</h2>
        <span className={`ml-auto text-xs font-bold ${cfg.bg} border ${cfg.border} px-3 py-1.5 rounded-full ${cfg.color} relative z-10 shadow-sm`}>{questions?.length || 0} questions</span>
      </div>

      <ol className="p-8 space-y-5 bg-[#05050e]/30 shadow-inner">
        {questions?.map((question, index) => (
          <li key={index} className="flex gap-4 text-slate-300 text-sm leading-relaxed group/item hover:bg-white/[0.02] p-2 -m-2 rounded-xl transition-colors">
            <span className={`text-xs font-bold flex-shrink-0 w-7 h-7 rounded-lg ${cfg.bg} border ${cfg.border} ${cfg.color} flex items-center justify-center mt-0.5 shadow-sm`}>
              {index + 1}
            </span>
            <span className="pt-1 group-hover/item:text-slate-200 transition-colors">{question}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function InterviewQuestionsResult() {
  const { resumeId, sessionId } = useParams();
  const [allSessions, setAllSessions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInterviewQuestions(resumeId)
      .then((data) => {
        const sessions = data.data || [];
        setAllSessions(sessions);
        if (sessionId) {
          const found = sessions.find((s) => String(s.id) === sessionId);
          setSelected(found || null);
        } else if (sessions.length > 0) {
          setSelected(sessions[0]);
        }
      })
      .catch(() => toast.error("Failed to load interview questions."))
      .finally(() => setLoading(false));
  }, [resumeId, sessionId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-80 gap-5 animate-in fade-in duration-500">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-pink-500/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-3 bg-pink-500/10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <MessageSquare size={20} className="text-pink-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white font-bold font-outfit tracking-wide text-lg">Loading Questions...</p>
            <p className="text-slate-500 text-sm mt-1.5 animate-pulse">Fetching your interview prep history</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // If a specific sessionId is provided, render only its questions without the history panel
  if (sessionId && selected) {
    return (
      <DashboardLayout>
        <div className="space-y-5">
          <div className="flex items-center gap-3 bg-[#0a0b18]/50 border border-white/[0.06] rounded-2xl px-5 py-3.5">
            <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
              <Briefcase size={16} className="text-pink-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{selected.job_role || "Interview Questions"}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Clock size={10} /> Generated on {formatDate(selected.created_at)}
              </p>
            </div>
          </div>
          {Object.keys(categoryConfig).map((key) =>
            selected[key]?.length > 0 && (
              <QuestionCard key={key} categoryKey={key} questions={selected[key]} />
            )
          )}
        </div>
      </DashboardLayout>
    );
  }

  if (allSessions.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-80 animate-in fade-in duration-500">
          <div className="text-center bg-red-500/10 border border-red-500/30 rounded-3xl px-12 py-10 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={28} className="text-red-400" />
            </div>
            <p className="text-red-300 font-bold font-outfit text-xl">No Questions Found</p>
            <p className="text-red-400/70 text-sm mt-2">Please run the question generator first.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Interview Questions</h1>
          <p className="text-slate-500 text-sm mt-1.5">
            AI-generated questions tailored to your resume & role
            <span className="ml-2 inline-flex items-center gap-1 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {allSessions.length} session{allSessions.length !== 1 ? "s" : ""}
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Session History Panel */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock size={12} /> Past Sessions
            </p>
            {allSessions.map((session) => {
              const isActive = selected?.id === session.id;
              const totalQs = (session.technical_questions?.length || 0) + (session.hr_questions?.length || 0) + (session.project_questions?.length || 0) + (session.coding_questions?.length || 0);
              return (
                <button
                  key={session.id}
                  onClick={() => setSelected(session)}
                  className={`w-full text-left rounded-2xl p-4 border transition-all duration-200 flex items-start gap-3 ${isActive ? "bg-pink-500/10 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.1)]" : "bg-[#0a0b18]/50 border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03]"}`}
                >
                  <div className={`flex-shrink-0 mt-0.5 p-2 rounded-xl ${isActive ? "bg-pink-500/20 border border-pink-500/30" : "bg-white/[0.03] border border-white/[0.06]"}`}>
                    <Briefcase size={14} className={isActive ? "text-pink-400" : "text-slate-500"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${isActive ? "text-pink-300" : "text-slate-300"}`}>{session.job_role || `Session ${allSessions.length - allSessions.indexOf(session)}`}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Clock size={10} /> {formatDate(session.created_at)}</p>
                    <p className={`text-xs font-medium mt-1 ${isActive ? "text-pink-400/70" : "text-slate-600"}`}>{totalQs} total questions</p>
                  </div>
                  <ChevronRight size={14} className={`flex-shrink-0 mt-1 transition-transform ${isActive ? "text-pink-400 translate-x-0.5" : "text-slate-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Questions Display */}
          {selected && (
            <div className="flex-1 space-y-5 min-w-0">
              <div className="flex items-center gap-3 bg-[#0a0b18]/50 border border-white/[0.06] rounded-2xl px-5 py-3.5">
                <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
                  <Briefcase size={16} className="text-pink-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{selected.job_role || "Interview Questions"}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Clock size={10} /> Generated on {formatDate(selected.created_at)}</p>
                </div>
              </div>
              {Object.keys(categoryConfig).map((key) =>
                selected[key]?.length > 0 && (
                  <QuestionCard key={key} categoryKey={key} questions={selected[key]} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewQuestionsResult;