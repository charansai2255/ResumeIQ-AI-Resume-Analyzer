import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  FileText,
  Copy,
  CheckCircle,
  FileCheck,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumeSummary } from "../../api/resumeSummary";

function ResumeSummaryResult() {
  const { resumeId } = useParams();

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getResumeSummary(resumeId);
      setSummary(data.summary);
    } catch {
      toast.error("Failed to load summary");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    toast.success("Summary copied!");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-pulse text-lg font-semibold">
            Generating Summary...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-4">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-3 rounded-xl">
              <FileText
                size={34}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Resume Summary
              </h1>

              <p className="text-gray-500 mt-1">
                AI-generated professional summary
              </p>
            </div>

          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            <Copy size={18} />
            Copy
          </button>

        </div>

        {/* Resume Info */}

        <div className="bg-white rounded-2xl shadow border mb-8">

          <div className="border-b px-6 py-4 flex items-center gap-2">

            <FileCheck
              size={20}
              className="text-blue-600"
            />

            <h2 className="font-semibold text-lg">
              Resume Information
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6">

            <div>
              <p className="text-sm text-gray-500">
                Resume ID
              </p>

              <p className="font-semibold">
                #{resumeId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Characters
              </p>

              <p className="font-semibold">
                {summary.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <div className="flex items-center gap-2 text-green-600 font-semibold">

                <CheckCircle size={18} />

                Generated

              </div>
            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="bg-white rounded-2xl shadow border">

          <div className="border-b px-6 py-4">

            <h2 className="text-xl font-semibold">
              Professional Summary
            </h2>

          </div>

          <div className="p-8">

            <div className="bg-gray-50 border rounded-xl p-8">

              <p className="text-gray-700 leading-9 text-[17px] whitespace-pre-wrap text-justify">
                {summary}
              </p>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ResumeSummaryResult;