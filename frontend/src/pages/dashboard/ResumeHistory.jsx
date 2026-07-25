import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getResumes, deleteResume } from "../../api/resume";
import { toast } from "react-hot-toast";
import { Search, FileText, Trash2, Clock, AlertCircle, Upload, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Normalise MIME type or extension to a short label
function getFileLabel(fileType) {
  if (!fileType) return "FILE";
  const t = fileType.toLowerCase();
  if (t.includes("pdf"))  return "PDF";
  if (t.includes("docx") || t.includes("wordprocessingml")) return "DOCX";
  if (t.includes("doc"))  return "DOC";
  return fileType.split("/").pop().toUpperCase();
}

function getFileLabelStyles(fileType) {
  const label = getFileLabel(fileType);
  if (label === "PDF")  return { badge: "bg-red-500/10 border-red-500/25 text-red-400", dot: "bg-red-400" };
  if (label === "DOCX") return { badge: "bg-blue-500/10 border-blue-500/25 text-blue-400", dot: "bg-blue-400" };
  return { badge: "bg-slate-500/10 border-slate-500/25 text-slate-400", dot: "bg-slate-400" };
}

// Confirmation modal component
function DeleteModal({ resume, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      {/* Modal */}
      <div className="relative bg-[#0d0e1e] border border-white/[0.10] rounded-2xl p-7 shadow-2xl max-w-sm w-full z-10 animate-slide-in-up">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-5">
          <Trash2 size={22} className="text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-white font-outfit text-center tracking-tight">Delete Resume?</h3>
        <p className="text-slate-400 text-sm text-center mt-2 leading-relaxed">
          This will permanently delete <span className="text-slate-200 font-semibold">"{resume?.filename}"</span> and all its associated analyses, cover letters, and results.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-white/[0.09] text-slate-400 hover:text-white hover:bg-white/5 font-semibold text-sm transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition duration-200 shadow-[0_4px_15px_rgba(239,68,68,0.3)]"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ResumeHistory() {
  const [resumes, setResumes]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [deleting, setDeleting]     = useState(null);
  const [confirmResume, setConfirmResume] = useState(null);
  const [search, setSearch]         = useState("");
  const [sortBy, setSortBy]         = useState("newest");
  const [filterType, setFilterType] = useState("all");

  const fetchResumes = async () => {
    try {
      const data = await getResumes();
      setResumes(data);
    } catch {
      toast.error("Failed to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResumes(); }, []);

  const handleDeleteConfirm = async () => {
    const id = confirmResume?.id;
    setConfirmResume(null);
    if (!id) return;
    try {
      setDeleting(id);
      await deleteResume(id);
      toast.success("Resume deleted successfully!");
      fetchResumes();
    } catch (error) {
      const msg = error?.response?.data?.detail || "Delete failed. Please try again.";
      toast.error(msg);
    } finally {
      setDeleting(null);
    }
  };

  // Normalised filter matching
  const matchesType = (resume) => {
    if (filterType === "all") return true;
    return getFileLabel(resume.file_type).toLowerCase() === filterType;
  };

  const filteredResumes = [...resumes]
    .filter((r) => r.filename.toLowerCase().includes(search.toLowerCase()) && matchesType(r))
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.uploaded_at) - new Date(a.uploaded_at);
        case "oldest": return new Date(a.uploaded_at) - new Date(b.uploaded_at);
        case "az":     return a.filename.localeCompare(b.filename);
        case "za":     return b.filename.localeCompare(a.filename);
        default:       return 0;
      }
    });

  const pdfCount  = resumes.filter((r) => getFileLabel(r.file_type) === "PDF").length;
  const docxCount = resumes.filter((r) => getFileLabel(r.file_type) === "DOCX").length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-80">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-indigo-500/50 border-t-indigo-400 rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm font-medium">Loading resumes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Delete Confirmation Modal */}
      {confirmResume && (
        <DeleteModal
          resume={confirmResume}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmResume(null)}
        />
      )}

      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Resume History</h1>
            <p className="text-slate-500 text-sm mt-1.5">Manage and organize your uploaded documents</p>
          </div>
          <Link
            to="/upload"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold px-6 py-3 rounded-xl transition duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.4)] text-sm w-full sm:w-auto"
          >
            <Upload size={16} />
            Upload New
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Resumes", value: resumes.length, color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20",    hoverBorder: "hover:border-blue-500/40",    filter: "all" },
            { label: "PDF Files",     value: pdfCount,       color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/20",     hoverBorder: "hover:border-red-500/40",     filter: "pdf" },
            { label: "DOCX Files",    value: docxCount,      color: "text-indigo-400",  bg: "bg-indigo-500/10",  border: "border-indigo-500/20",  hoverBorder: "hover:border-indigo-500/40",  filter: "docx" },
          ].map(({ label, value, color, bg, border, hoverBorder, filter }) => (
            <button
              key={label}
              onClick={() => setFilterType(filterType === filter ? "all" : filter)}
              className={`relative overflow-hidden ${bg} border ${border} rounded-2xl p-6 text-left transition-all duration-300 ${filterType === filter ? `ring-2 ring-offset-2 ring-offset-[#05050e] ring-${color.split('-')[1]}-500/50 scale-[1.02] shadow-lg` : `${hoverBorder} hover:scale-[1.01]`}`}
            >
              {/* Subtle background glow */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${color.replace('text', 'bg')}`} />
              
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 relative z-10">{label}</p>
              <p className={`text-4xl font-black font-outfit ${color} relative z-10`}>{value}</p>
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search resumes by filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0b18]/70 border border-white/[0.07] focus:border-indigo-500/50 focus:bg-indigo-500/5 text-slate-100 rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all duration-300 text-sm placeholder:text-slate-600 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#0a0b18]/70 border border-white/[0.07] hover:border-white/[0.12] rounded-xl px-4 py-3.5 text-sm text-slate-400 transition-all duration-300 shadow-sm">
            <Filter size={16} className="text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-slate-200 cursor-pointer w-full font-medium"
            >
              <option value="newest" className="bg-[#0a0b18]">Newest First</option>
              <option value="oldest" className="bg-[#0a0b18]">Oldest First</option>
              <option value="az"     className="bg-[#0a0b18]">Name (A-Z)</option>
              <option value="za"     className="bg-[#0a0b18]">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Active filter chip */}
        {filterType !== "all" && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
            <span className="text-xs font-medium text-slate-500">Active Filter:</span>
            <button
              onClick={() => setFilterType("all")}
              className="inline-flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-indigo-500/25 transition-colors duration-200"
            >
              {filterType.toUpperCase()}
              <span className="ml-1 opacity-60 hover:opacity-100">✕</span>
            </button>
          </div>
        )}

        {/* Resume list */}
        {filteredResumes.length === 0 ? (
          <div className="bg-[#0a0b18]/70 border border-white/[0.05] rounded-2xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertCircle size={32} className="text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit mb-2 tracking-tight">
              {search || filterType !== "all" ? "No matches found" : "Your vault is empty"}
            </h2>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              {search || filterType !== "all"
                ? "Try adjusting your search query or removing the active filter."
                : "Upload your first resume to start analyzing, generating cover letters, and matching with jobs."}
            </p>
            {!search && filterType === "all" && (
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] hover:-translate-y-0.5"
              >
                <Upload size={16} />
                Upload Resume
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResumes.map((resume) => {
              const label = getFileLabel(resume.file_type);
              const styles = getFileLabelStyles(resume.file_type);
              const isDeleting = deleting === resume.id;

              return (
                <div
                  key={resume.id}
                  className={`group bg-[#0a0b18]/70 border rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                    isDeleting
                      ? "border-red-500/30 bg-red-500/5 opacity-60 scale-[0.99]"
                      : "border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Icon + Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`p-3.5 rounded-xl border flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${styles.badge}`}>
                        <FileText size={22} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors font-outfit truncate tracking-wide" title={resume.filename}>
                          {resume.filename}
                        </h2>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Clock size={12} className="text-slate-500" />
                          <p className="text-xs text-slate-400">
                            {new Date(resume.uploaded_at).toLocaleString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                              hour: "2-digit", minute: "2-digit"
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* File type badge */}
                      <span className={`inline-flex items-center gap-1.5 border px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} animate-pulse`} />
                        {label}
                      </span>

                      {/* Delete button */}
                      <button
                        onClick={() => setConfirmResume(resume)}
                        disabled={isDeleting}
                        className="flex items-center gap-1.5 bg-white/[0.03] hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-white/[0.05] hover:border-red-500/20 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <span className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                        <span className="hidden sm:inline">{isDeleting ? "Deleting..." : "Delete"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Result count */}
            <p className="text-center text-xs text-slate-500 pt-4 font-medium tracking-wide">
              Showing <span className="text-slate-300 font-bold">{filteredResumes.length}</span> of {resumes.length} document{resumes.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ResumeHistory;