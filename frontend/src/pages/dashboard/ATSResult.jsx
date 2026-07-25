import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getAnalysis } from "../../api/analysis";
import ScoreCard from "../../components/common/ScoreCard";
import AnalysisCard from "../../components/common/AnalysisCard";

function ATSResult() {
  const { resumeId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalysis(resumeId)
      .then((data) => setAnalysis(data.analysis || data))
      .catch(() => toast.error("Failed to load analysis."))
      .finally(() => setLoading(false));
  }, [resumeId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-80 gap-5 animate-in fade-in duration-500">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-3 bg-indigo-500/10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <BarChart3 size={20} className="text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white font-bold font-outfit tracking-wide text-lg">Analyzing with AI...</p>
            <p className="text-slate-500 text-sm mt-1.5 animate-pulse">Scanning your resume for ATS compatibility</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-80 animate-in fade-in duration-500">
          <div className="text-center bg-red-500/10 border border-red-500/30 rounded-3xl px-12 py-10 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-4">
              <XCircle size={28} className="text-red-400" />
            </div>
            <p className="text-red-300 font-bold font-outfit text-xl">No Analysis Found</p>
            <p className="text-red-400/70 text-sm mt-2">Please run an analysis first.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">ATS Result</h1>
          <p className="text-slate-500 text-sm mt-1.5">Detailed analysis of your resume's ATS compatibility</p>
        </div>

        <ScoreCard score={analysis.ats_score} resumeName="Resume.pdf" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnalysisCard title="Strengths"     icon={CheckCircle}   color="text-green-600"  items={analysis.strengths} />
          <AnalysisCard title="Weaknesses"    icon={XCircle}       color="text-red-600"    items={analysis.weaknesses} />
          <AnalysisCard title="Missing Skills" icon={AlertTriangle} color="text-orange-500" items={analysis.missing_skills} />
          <AnalysisCard title="Suggestions"   icon={Lightbulb}     color="text-indigo-600" items={analysis.suggestions} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ATSResult;