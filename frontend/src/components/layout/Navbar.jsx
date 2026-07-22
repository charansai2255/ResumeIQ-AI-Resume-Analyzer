import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div>
        <p className="font-semibold">
          Welcome, {user?.name || "User"} 👋
        </p>

        <p className="text-sm text-gray-500">
          {user?.email}
        </p>
      </div>
    </header>
  );
}

export default Navbar;