import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes } from "../../api/resume";
import { createCoverLetter } from "../../api/coverLetter";

function CoverLetter() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
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

  const handleGenerate = async () => {
    if (!companyName || !jobTitle || !jobDescription) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await createCoverLetter(resumeId, {
        company_name: companyName,
        job_title: jobTitle,
        job_description: jobDescription,
      });

      toast.success("Cover Letter Generated!");

      navigate(`/cover-letter/result/${resumeId}`);
    } catch {
      toast.error("Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Cover Letter Generator
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-5">

        <div>
          <label className="font-semibold">
            Resume
          </label>

          <select
            value={resumeId}
            onChange={(e) =>
              setResumeId(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
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
        </div>

        <div>
          <label className="font-semibold">
            Company Name
          </label>

          <input
            type="text"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Google"
          />
        </div>

        <div>
          <label className="font-semibold">
            Job Title
          </label>

          <input
            type="text"
            value={jobTitle}
            onChange={(e) =>
              setJobTitle(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <label className="font-semibold">
            Job Description
          </label>

          <textarea
            rows="10"
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            className="w-full border rounded-lg p-4 mt-2"
            placeholder="Paste Job Description..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Generating..."
            : "Generate Cover Letter"}
        </button>

      </div>
    </DashboardLayout>
  );
}

export default CoverLetter;