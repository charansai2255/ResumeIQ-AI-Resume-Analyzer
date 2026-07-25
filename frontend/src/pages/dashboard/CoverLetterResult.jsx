import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FileSignature, Copy, Check } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getCoverLetter } from "../../api/coverLetter";

function CoverLetterResult() {
  const { resumeId } = useParams();
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getCoverLetter(resumeId)
      .then((data) => setCoverLetter(data.cover_letter))
      .catch(() => toast.error("Failed to load cover letter."))
      .finally(() => setLoading(false));
  }, [resumeId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-80 gap-5 animate-in fade-in duration-500">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-orange-500/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-3 bg-orange-500/10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <FileSignature size={20} className="text-orange-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white font-bold font-outfit tracking-wide text-lg">Generating Cover Letter...</p>
            <p className="text-slate-500 text-sm mt-1.5 animate-pulse">Our AI is crafting your personalized letter</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Cover Letter</h1>
            <p className="text-slate-500 text-sm mt-1.5">AI-generated and ready to use</p>
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
            {copied ? "Copied to Clipboard" : "Copy to Clipboard"}
          </button>
        </div>

        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/[0.12] transition-all duration-300">
          {/* Header bar */}
          <div className="flex items-center gap-3 px-8 py-5 border-b border-white/[0.05] bg-orange-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 animate-shimmer" />
            <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 relative z-10">
              <FileSignature size={18} />
            </div>
            <span className="text-sm font-bold text-orange-300 tracking-wide uppercase relative z-10">AI Generated Cover Letter</span>
          </div>
          {/* Content */}
          <div className="p-8 md:p-10 whitespace-pre-wrap leading-relaxed text-slate-300 text-sm md:text-base font-[Inter] tracking-wide bg-[#05050e]/30 shadow-inner">
            {coverLetter}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CoverLetterResult;