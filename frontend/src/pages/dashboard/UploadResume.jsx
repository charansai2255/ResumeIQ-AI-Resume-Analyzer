import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { uploadResume } from "../../api/resume";
import { toast } from "react-hot-toast";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUpload = async () => {
    if (!file) { toast.error("Please select a resume."); return; }
    try {
      setLoading(true);
      await uploadResume(file);
      toast.success("Resume uploaded successfully!");
      setUploaded(true);
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit tracking-tight">Upload Resume</h1>
          <p className="text-slate-500 text-sm mt-1.5">Add a new resume to your library for analysis</p>
        </div>

        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-3xl p-8 shadow-lg hover:shadow-xl hover:border-white/[0.12] transition-all duration-300 space-y-6">

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group ${
              dragging
                ? "border-indigo-500/70 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.15)] scale-[1.02]"
                : "border-white/[0.09] hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
            }`}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />

            <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-300 shadow-inner ${
              dragging ? "bg-indigo-500/20 border border-indigo-500/50 scale-110 rotate-3" : "bg-white/[0.02] border border-white/[0.08] group-hover:bg-indigo-500/15 group-hover:border-indigo-500/30 group-hover:-translate-y-1"
            }`}>
              <Upload size={32} className={`transition-all duration-300 ${dragging ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400"}`} />
            </div>

            <p className="text-lg font-semibold text-slate-300 group-hover:text-white transition duration-300 font-outfit tracking-wide">
              Drag & drop your resume or <span className="text-indigo-400">browse files</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">Supports PDF, DOC, DOCX up to 10MB</p>
          </div>

          {/* Selected file preview */}
          {file && (
            <div className="flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex-shrink-0">
                <FileText size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-200 text-sm truncate tracking-wide">{file.name}</p>
                <p className="text-xs text-indigo-300/80 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-slate-500 hover:text-red-400 transition-all p-2 rounded-xl hover:bg-red-500/15"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Success state */}
          {uploaded && !file && (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
              <CheckCircle size={22} className="text-emerald-400 flex-shrink-0" />
              <p className="text-emerald-300 text-sm font-medium tracking-wide">Resume uploaded successfully! Ready for another.</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            {loading ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading...</>
            ) : (
              <><Upload size={18} />Upload Document</>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UploadResume;