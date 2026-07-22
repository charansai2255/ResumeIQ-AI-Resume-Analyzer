import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { uploadResume } from "../../api/resume";
import { toast } from "react-hot-toast";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      await uploadResume(file);

      toast.success("Resume uploaded successfully!");

      setFile(null);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          Upload Resume
        </h1>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-5"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

        {file && (
          <p className="mt-4 text-gray-600">
            Selected: <strong>{file.name}</strong>
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default UploadResume;