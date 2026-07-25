import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, BadgeCheck, Briefcase } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import ScoreCard from "../../components/common/ScoreCard";
import AnalysisCard from "../../components/common/AnalysisCard";
import { getJobMatch } from "../../api/jobMatch";

function JobMatchResult() {
  const { resumeId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobMatch(resumeId)
      .then((data) => setAnalysis(data.analysis))
      .catch(() => toast.error("Failed to load Job Match."))
      .finally(() => setLoading(false));
  }, [resumeId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-80 gap-5 animate-in fade-in duration-500">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-3 bg-purple-500/10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Briefcase size={20} className="text-purple-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white font-bold font-outfit tracking-wide text-lg">Analyzing Job Match...</p>
            <p className="text-slate-500 text-sm mt-1.5 animate-pulse">Comparing your resume with the job</p>
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
            <p className="text-red-300 font-bold font-outfit text-xl">No Job Match Found</p>
            <p className="text-red-400/70 text-sm mt-2">Please run a job match analysis first.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Job Match Result</h1>
          <p className="text-slate-500 text-sm mt-1.5">Analysis of how well your resume matches the job</p>
        </div>

        <ScoreCard score={analysis.match_score} resumeName="Selected Resume" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnalysisCard title="Matching Skills" icon={BadgeCheck}    color="text-green-600"  items={analysis.matching_skills} />
          <AnalysisCard title="Missing Skills"  icon={AlertTriangle} color="text-orange-500" items={analysis.missing_skills} />
          <AnalysisCard title="Strengths"       icon={CheckCircle}   color="text-emerald-600" items={analysis.strengths} />
          <AnalysisCard title="Weaknesses"      icon={XCircle}       color="text-red-600"    items={analysis.weaknesses} />
        </div>

        <AnalysisCard title="Suggestions" icon={Lightbulb} color="text-indigo-600" items={analysis.suggestions} />
      </div>
    </DashboardLayout>
  );
}

export default JobMatchResult;