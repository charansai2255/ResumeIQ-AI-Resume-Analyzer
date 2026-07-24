import { useEffect, useState } from "react";

import {
  Upload,
  Target,
  Briefcase,
  FileSignature,
  ScrollText,
  MessageSquare,
} from "lucide-react";

import { getRecentActivity } from "../../api/dashboard";

const iconMap = {
  "Resume Uploaded": Upload,
  "ATS Analysis": Target,
  "Job Match": Briefcase,
  "Cover Letter": FileSignature,
  "Resume Summary": ScrollText,
  "Interview Questions": MessageSquare,
};

function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      const data = await getRecentActivity();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
    }
  };

  const formatDate = (date) => {
    const activityDate = new Date(date);
    return activityDate.toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No recent activity.
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((item, index) => {
            const Icon = iconMap[item.type] || Upload;

            return (
              <div
                key={index}
                className="flex items-start gap-4"
              >
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon
                    className="text-blue-600"
                    size={20}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.type}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;