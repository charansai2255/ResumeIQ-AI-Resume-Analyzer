import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FileText, Copy, Check, CheckCircle, FileCheck, ScrollText } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumeSummary } from "../../api/resumeSummary";

function ResumeSummaryResult() {
  const { resumeId } = useParams();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getResumeSummary(resumeId)
      .then((data) => setSummary(data.summary))
      .catch(() => toast.error("Failed to load summary"))
      .finally(() => setLoading(false));
  }, [resumeId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-80 gap-5 animate-in fade-in duration-500">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-3 bg-indigo-500/10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <ScrollText size={20} className="text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white font-bold font-outfit tracking-wide text-lg">Generating Summary...</p>
            <p className="text-slate-500 text-sm mt-1.5 animate-pulse">AI is reading your resume</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;
  const charCount = summary.length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Resume Summary</h1>
            <p className="text-slate-500 text-sm mt-1.5">AI-generated professional summary</p>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-300 flex-shrink-0 shadow-sm ${
              copied
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                : "bg-white/5 border-white/[0.09] text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} className={!copied && "group-hover:scale-110 transition-transform"} />}
            {copied ? "Copied!" : "Copy Summary"}
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Resume ID",   value: `#${resumeId.substring(0, 8)}…`, icon: FileText,   color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", glow: "shadow-[0_0_15px_rgba(99,102,241,0.1)]" },
            { label: "Word Count",  value: wordCount,                        icon: FileCheck,  color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   glow: "shadow-[0_0_15px_rgba(59,130,246,0.1)]" },
            { label: "Status",      value: "Generated",                      icon: CheckCircle,color: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-emerald-500/20",glow: "shadow-[0_0_15px_rgba(52,211,153,0.1)]" },
          ].map(({ label, value, icon: Icon, color, bg, border, glow }) => (
            <div key={label} className={`${bg} border ${border} rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 ${glow}`}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`p-1.5 rounded-lg bg-white/5`}>
                  <Icon size={16} className={color} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
              </div>
              <p className={`font-black text-2xl font-outfit ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Summary card */}
        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/[0.12] transition-all duration-300">
          <div className="flex items-center gap-3 px-8 py-5 border-b border-white/[0.05] bg-indigo-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 animate-shimmer" />
            <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 relative z-10">
              <ScrollText size={18} />
            </div>
            <span className="text-sm font-bold text-indigo-300 tracking-wide uppercase relative z-10">Professional Summary · AI Generated</span>
            <span className="ml-auto text-xs font-medium text-slate-500 relative z-10 bg-black/20 px-2 py-1 rounded-md">{charCount} characters</span>
          </div>

          <div className="p-8 md:p-10 bg-[#05050e]/30 shadow-inner">
            <p className="text-slate-300 leading-[2] text-sm md:text-base whitespace-pre-wrap tracking-wide font-[Inter]">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResumeSummaryResult;