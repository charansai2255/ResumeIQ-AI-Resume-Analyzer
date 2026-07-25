import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload, BarChart3, Briefcase, FileSignature, ScrollText, MessageSquare } from "lucide-react";

const actions = [
  {
    title: "Upload Resume",
    description: "Add a new resume to your library",
    icon: Upload,
    path: "/upload",
    gradient: "from-blue-600 to-cyan-600",
    glow: "rgba(59,130,246,0.3)",
    iconBg: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  },
  {
    title: "ATS Analysis",
    description: "Check your resume's ATS compatibility score",
    icon: BarChart3,
    path: "/ats-analysis",
    gradient: "from-emerald-600 to-teal-600",
    glow: "rgba(52,211,153,0.3)",
    iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  },
  {
    title: "Job Match",
    description: "See how well your resume fits a job",
    icon: Briefcase,
    path: "/job-match",
    gradient: "from-purple-600 to-violet-600",
    glow: "rgba(168,85,247,0.3)",
    iconBg: "bg-purple-500/15 border-purple-500/30 text-purple-400",
  },
  {
    title: "Cover Letter",
    description: "Generate a personalized cover letter",
    icon: FileSignature,
    path: "/cover-letter",
    gradient: "from-orange-600 to-amber-600",
    glow: "rgba(249,115,22,0.3)",
    iconBg: "bg-orange-500/15 border-orange-500/30 text-orange-400",
  },
  {
    title: "Resume Summary",
    description: "Get an AI-powered summary of your resume",
    icon: ScrollText,
    path: "/resume-summary",
    gradient: "from-indigo-600 to-blue-600",
    glow: "rgba(99,102,241,0.3)",
    iconBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
  },
  {
    title: "Interview Prep",
    description: "Generate tailored interview questions",
    icon: MessageSquare,
    path: "/interview",
    gradient: "from-pink-600 to-rose-600",
    glow: "rgba(236,72,153,0.3)",
    iconBg: "bg-pink-500/15 border-pink-500/30 text-pink-400",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-bold text-white font-outfit tracking-tight">Quick Actions</h2>
        <span className="text-xs text-slate-500 bg-white/5 border border-white/[0.07] px-2.5 py-1 rounded-full">
          {actions.length} tools
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="group relative bg-[#0a0b18]/70 border border-white/[0.07] rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-xl overflow-hidden"
              style={{ "--glow": action.glow }}
            >
              {/* Hover gradient wash */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${action.gradient}`}
                style={{ opacity: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.05")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              />

              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl border ${action.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} />
                </div>
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-slate-600 group-hover:text-slate-300 group-hover:bg-white/10 group-hover:border-white/15 transition-all duration-200">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>

              <h3 className="font-semibold text-base text-slate-200 group-hover:text-white transition-colors duration-200">
                {action.title}
              </h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;