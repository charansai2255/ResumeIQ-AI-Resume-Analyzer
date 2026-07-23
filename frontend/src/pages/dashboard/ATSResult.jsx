import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getAnalysis } from "../../api/analysis";

import ScoreCard from "../../components/common/ScoreCard";
import AnalysisCard from "../../components/common/AnalysisCard";

import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

function ATSResult() {
  const { resumeId } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysis(resumeId);

        // If your backend returns { analysis: {...} }
        setAnalysis(data.analysis || data);
      } catch (error) {
        toast.error("Failed to load analysis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resumeId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg font-semibold">
            Loading ATS Analysis...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg font-semibold text-red-600">
            No Analysis Found
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

  <ScoreCard
    score={analysis.ats_score}
    resumeName="Resume.pdf"
  />

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

    <AnalysisCard
      title="Strengths"
      icon={CheckCircle}
      color="text-green-600"
      items={analysis.strengths}
    />

    <AnalysisCard
      title="Weaknesses"
      icon={XCircle}
      color="text-red-600"
      items={analysis.weaknesses}
    />

    <AnalysisCard
      title="Missing Skills"
      icon={AlertTriangle}
      color="text-orange-500"
      items={analysis.missing_skills}
    />

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

export default ATSResult;