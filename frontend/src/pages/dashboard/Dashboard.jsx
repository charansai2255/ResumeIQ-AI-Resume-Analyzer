import DashboardLayout from "../../layouts/DashboardLayout";

import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatCard from "../../components/dashboard/StatCard";

import {
  FileText,
  Target,
  Briefcase,
  FileSignature,
  ScrollText,
  MessageSquare,
} from "lucide-react";

function Dashboard() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <WelcomeCard />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <StatCard
            title="Total Resumes"
            value="6"
            icon={FileText}
            color="bg-blue-500"
          />

          <StatCard
            title="ATS Analysis"
            value="4"
            icon={Target}
            color="bg-green-500"
          />

          <StatCard
            title="Job Matches"
            value="3"
            icon={Briefcase}
            color="bg-purple-500"
          />

          <StatCard
            title="Cover Letters"
            value="5"
            icon={FileSignature}
            color="bg-orange-500"
          />

          <StatCard
            title="Resume Summaries"
            value="4"
            icon={ScrollText}
            color="bg-indigo-500"
          />

          <StatCard
            title="Interview Sets"
            value="7"
            icon={MessageSquare}
            color="bg-pink-500"
          />

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;