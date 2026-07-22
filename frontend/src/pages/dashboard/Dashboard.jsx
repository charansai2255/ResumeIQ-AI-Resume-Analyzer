import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            ATS Score
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            --
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Job Match
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            --
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Uploaded Resumes
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            --
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;