import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser, getCurrentUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.access_token);
      const user = await getCurrentUser();
      login(response.access_token, user);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-[#0a0b1a]/80 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white font-outfit tracking-tight">Welcome back</h2>
          <p className="text-slate-500 text-sm mt-1.5">Sign in to your ResumeIQ account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
            <div className="relative mt-1.5">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-white/[0.04] border border-white/[0.09] focus:border-indigo-500/60 focus:bg-indigo-500/5 text-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none transition duration-200 text-sm placeholder:text-slate-700"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative mt-1.5">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className="w-full bg-white/[0.04] border border-white/[0.09] focus:border-indigo-500/60 focus:bg-indigo-500/5 text-slate-100 rounded-xl py-3 pl-10 pr-11 outline-none transition duration-200 text-sm placeholder:text-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full mt-2 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 transition duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing In...</>
            ) : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-500 text-sm">
          New to ResumeIQ?{" "}
          <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition">
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;