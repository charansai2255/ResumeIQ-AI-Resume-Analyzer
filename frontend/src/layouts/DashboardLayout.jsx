import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-brand-dark overflow-hidden text-slate-100 relative">
      {/* Ambient background glows */}
      <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-600/4 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-600/4 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-indigo-600/3 blur-[120px] pointer-events-none" />

      {/* Fixed Sidebar */}
      <div className="w-64 flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 overflow-hidden z-10 min-w-0">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
          <div className="animate-slide-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;