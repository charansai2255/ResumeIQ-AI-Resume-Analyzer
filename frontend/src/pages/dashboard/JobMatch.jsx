import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { matchResume } from "../../api/jobMatch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function JobMatch() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();

        setResumes(data);

        if (data.length > 0) {
          setResumeId(data[0].id);
        }
      } catch {
        toast.error("Failed to load resumes.");
      }
    };

    fetchResumes();
  }, []);

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a Job Description.");
      return;
    }

    try {
      setLoading(true);

      await matchResume(
        resumeId,
        jobDescription
      );

      toast.success("Job Match Generated!");

      navigate(`/job-match/result/${resumeId}`);
    } catch {
      toast.error("Job Match Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Job Match
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <label className="font-semibold">
          Select Resume
        </label>

        <select
          value={resumeId}
          onChange={(e) =>
            setResumeId(e.target.value)
          }
          className="w-full border rounded-lg p-3 mt-2 mb-6"
        >
          {resumes.map((resume) => (
            <option
              key={resume.id}
              value={resume.id}
            >
              {resume.filename}
            </option>
          ))}
        </select>

        <label className="font-semibold">
          Job Description
        </label>

        <textarea
          rows="12"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          placeholder="Paste the complete Job Description here..."
          className="w-full border rounded-lg p-4 mt-2"
        />

        <button
          onClick={handleMatch}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Matching..."
            : "Match Resume"}
        </button>

      </div>
    </DashboardLayout>
  );
}

export default JobMatch;