import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getCoverLetter } from "../../api/coverLetter";

function CoverLetterResult() {
  const { resumeId } = useParams();

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const data = await getCoverLetter(resumeId);
        setCoverLetter(data.cover_letter);
      } catch {
        toast.error("Failed to load cover letter.");
      } finally {
        setLoading(false);
      }
    };

    fetchLetter();
  }, [resumeId]);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Cover Letter
      </h1>

      <div className="bg-white rounded-xl shadow p-8 whitespace-pre-wrap leading-8">
        {coverLetter}
      </div>
    </DashboardLayout>
  );
}

export default CoverLetterResult;