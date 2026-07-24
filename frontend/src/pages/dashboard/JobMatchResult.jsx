import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  BadgeCheck,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import ScoreCard from "../../components/common/ScoreCard";
import AnalysisCard from "../../components/common/AnalysisCard";

import { getJobMatch } from "../../api/jobMatch";

function JobMatchResult() {
  const { resumeId } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getJobMatch(resumeId);

        setAnalysis(data.analysis);
      } catch (error) {
        toast.error("Failed to load Job Match.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resumeId]);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout>
        <p>No Job Match Found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <ScoreCard
        score={analysis.match_score}
        resumeName="Selected Resume"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <AnalysisCard
          title="Matching Skills"
          icon={BadgeCheck}
          color="text-green-600"
          items={analysis.matching_skills}
        />

        <AnalysisCard
          title="Missing Skills"
          icon={AlertTriangle}
          color="text-orange-500"
          items={analysis.missing_skills}
        />

        <AnalysisCard
          title="Strengths"
          icon={CheckCircle}
          color="text-emerald-600"
          items={analysis.strengths}
        />

        <AnalysisCard
          title="Weaknesses"
          icon={XCircle}
          color="text-red-600"
          items={analysis.weaknesses}
        />

      </div>

      <div className="mt-6">

        <AnalysisCard
          title="Suggestions"
          icon={Lightbulb}
          color="text-indigo-600"
          items={analysis.suggestions}
        />

      </div>

    </DashboardLayout>
  );
}

export default JobMatchResult;