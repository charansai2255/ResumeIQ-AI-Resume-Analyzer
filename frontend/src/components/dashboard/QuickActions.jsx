import { useNavigate } from "react-router-dom";
import {
  Upload,
  BarChart3,
  Briefcase,
  FileSignature,
  ScrollText,
  MessageSquare,
} from "lucide-react";

const actions = [
  {
    title: "Upload Resume",
    description: "Upload a new resume",
    icon: Upload,
    path: "/upload",
    color: "bg-blue-500",
  },
  {
    title: "ATS Analysis",
    description: "Check ATS Score",
    icon: BarChart3,
    path: "/ats-analysis",
    color: "bg-green-500",
  },
  {
    title: "Job Match",
    description: "Match with a Job Description",
    icon: Briefcase,
    path: "/job-match",
    color: "bg-purple-500",
  },
  {
    title: "Cover Letter",
    description: "Generate Cover Letter",
    icon: FileSignature,
    path: "/cover-letter",
    color: "bg-orange-500",
  },
  {
    title: "Resume Summary",
    description: "Generate Summary",
    icon: ScrollText,
    path: "/resume-summary",
    color: "bg-indigo-500",
  },
  {
    title: "Interview Questions",
    description: "Practice Interview",
    icon: MessageSquare,
    path: "/interview",
    color: "bg-pink-500",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="border rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all text-left"
            >
              <div
                className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon className="text-white" size={22} />
              </div>

              <h3 className="font-semibold text-lg">
                {action.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {action.description}
              </p>
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default QuickActions;