import { CalendarDays, Sparkles } from "lucide-react";

function WelcomeCard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-2xl text-white p-8 shadow-lg">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={22} />
            <span className="font-medium">
              Welcome Back 👋
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            ResumeIQ Dashboard
          </h1>

          <p className="mt-3 text-blue-100 max-w-2xl">
            Manage resumes, analyze ATS scores, match jobs,
            generate cover letters, resume summaries,
            and interview questions—all in one place.
          </p>

        </div>

        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <CalendarDays size={18} />
          {today}
        </div>

      </div>

    </div>
  );
}

export default WelcomeCard;