import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import ATSChart from "../../components/dashboard/ATSChart";

import { getDashboardStats } from "../../api/dashboard";

import {
  FileText,
  Target,
  Briefcase,
  FileSignature,
  ScrollText,
  MessageSquare,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    total_resumes: 0,
    ats_reports: 0,
    job_matches: 0,
    cover_letters: 0,
    resume_summaries: 0,
    interview_sets: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeCard />

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StatCard
            title="Total Resumes"
            value={stats.total_resumes}
            icon={FileText}
            color="bg-blue-500"
          />

          <StatCard
            title="ATS Analysis"
            value={stats.ats_reports}
            icon={Target}
            color="bg-green-500"
          />

          <StatCard
            title="Job Matches"
            value={stats.job_matches}
            icon={Briefcase}
            color="bg-purple-500"
          />

          <StatCard
            title="Cover Letters"
            value={stats.cover_letters}
            icon={FileSignature}
            color="bg-orange-500"
          />

          <StatCard
            title="Resume Summaries"
            value={stats.resume_summaries}
            icon={ScrollText}
            color="bg-indigo-500"
          />

          <StatCard
            title="Interview Sets"
            value={stats.interview_sets}
            icon={MessageSquare}
            color="bg-pink-500"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Activity & ATS Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />
          <ATSChart />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;