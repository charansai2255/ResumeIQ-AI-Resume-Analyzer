import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CheckCircle, AlertTriangle, XCircle, Calendar } from "lucide-react";

function ScoreCard({ score, resumeName }) {
  const getTheme = () => {
    if (score >= 80) return { color: "#10b981", label: "Excellent", Icon: CheckCircle, bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-400", desc: "Your resume is highly ATS-compatible." };
    if (score >= 60) return { color: "#f59e0b", label: "Good",      Icon: AlertTriangle, bg: "bg-amber-500/10",   border: "border-amber-500/25",   text: "text-amber-400",   desc: "Minor improvements could boost your score." };
    return            { color: "#ef4444", label: "Needs Work",  Icon: XCircle,       bg: "bg-red-500/10",    border: "border-red-500/25",    text: "text-red-400",    desc: "Several areas need attention." };
  };

  const theme = getTheme();
  const { color, label, Icon, bg, border, text, desc } = theme;

  return (
    <div className="group relative bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl p-8 overflow-hidden shadow-xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:border-white/[0.12] transition-all duration-500">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at top right, ${color}1a 0%, transparent 60%)` }} />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: info */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">ATS Analysis Report</p>
            <h2 className="text-3xl font-bold text-white font-outfit tracking-tight group-hover:text-slate-100 transition-colors">Analysis Complete</h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <span className="text-slate-500">File:</span>
              <span className="font-medium truncate max-w-[280px]">{resumeName}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Calendar size={12} />
              <span>Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>

          {/* Evaluation badge */}
          <div className={`inline-flex items-center gap-2.5 ${bg} border ${border} ${text} px-4 py-2.5 rounded-xl transition-transform duration-300 group-hover:scale-105 origin-left`}>
            <Icon size={18} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Evaluation</p>
              <p className="font-black text-lg leading-none font-outfit">{label}</p>
            </div>
          </div>

          <p className="text-slate-400 text-sm">{desc}</p>
        </div>

        {/* Right: circular score */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="w-40 h-40 transition-transform duration-500 group-hover:scale-110" style={{ filter: `drop-shadow(0 0 20px ${color}40)` }}>
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                pathColor: color,
                textColor: color,
                trailColor: "rgba(255,255,255,0.05)",
                textSize: "18px",
                pathTransitionDuration: 1,
              })}
            />
          </div>
          <p className="text-xs text-slate-500 font-medium tracking-wide">ATS Score</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;