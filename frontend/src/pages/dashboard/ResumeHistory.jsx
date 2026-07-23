import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes, deleteResume } from "../../api/resume";
import { toast } from "react-hot-toast";
import { Search, FileText, Trash2 } from "lucide-react";

function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchResumes = async () => {
    try {
      const data = await getResumes();
      setResumes(data);
    } catch (error) {
      toast.error("Failed to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await deleteResume(id);
      toast.success("Resume deleted!");
      fetchResumes();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  const filteredResumes = [...resumes]
    .filter((resume) =>
      resume.filename.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploaded_at) - new Date(a.uploaded_at);

        case "oldest":
          return new Date(a.uploaded_at) - new Date(b.uploaded_at);

        case "az":
          return a.filename.localeCompare(b.filename);

        case "za":
          return b.filename.localeCompare(a.filename);

        default:
          return 0;
      }
    });

  const pdfCount = resumes.filter(
    (resume) => resume.file_type?.toLowerCase() === "pdf"
  ).length;

  const docxCount = resumes.filter(
    (resume) => resume.file_type?.toLowerCase() === "docx"
  ).length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg font-medium">Loading resumes...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Resume History
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your uploaded resumes.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm">Total Resumes</h3>
          <p className="text-3xl font-bold text-blue-600">
            {resumes.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm">PDF Files</h3>
          <p className="text-3xl font-bold text-green-600">
            {pdfCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm">DOCX Files</h3>
          <p className="text-3xl font-bold text-purple-600">
            {docxCount}
          </p>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>

      {/* Resume Cards */}
      {filteredResumes.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <FileText
            size={60}
            className="mx-auto text-gray-400 mb-4"
          />

          <h2 className="text-2xl font-semibold mb-2">
            No Resumes Found
          </h2>

          <p className="text-gray-500">
            Upload your first resume to start analyzing it.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredResumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex gap-4">
                  <FileText
                    size={42}
                    className="text-blue-600 flex-shrink-0"
                  />

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {resume.filename}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Uploaded:
                      {" "}
                      {new Date(
                        resume.uploaded_at
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold w-fit">
                  {resume.file_type.toUpperCase()}
                </span>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default ResumeHistory;