import { useForm } from "react-hook-form";
import { loginUser, getCurrentUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Login API
      const response = await loginUser(data);

      // Save token
      localStorage.setItem("token", response.access_token);

      // Get logged-in user
      const user = await getCurrentUser();

      // Save user in context
      login(response.access_token, user);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            className="border p-3 w-full rounded mb-2"
          />

          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Password"
            className="border p-3 w-full rounded mt-3 mb-2"
          />

          <p className="text-red-500 text-sm">
            {errors.password?.message}
          </p>

          <button
            disabled={isSubmitting}
            className="bg-green-600 text-white w-full p-3 rounded mt-5 hover:bg-green-700"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;