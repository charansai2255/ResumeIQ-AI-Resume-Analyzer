import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Account created successfully!");
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-[#0a0b1a]/80 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white font-outfit tracking-tight">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1.5">Start your AI-powered career journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
            <div className="relative mt-1.5">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
                className="w-full bg-white/[0.04] border border-white/[0.09] focus:border-indigo-500/60 focus:bg-indigo-500/5 text-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none transition duration-200 text-sm placeholder:text-slate-700"
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
            <div className="relative mt-1.5">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
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
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                placeholder="••••••••"
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
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
            ) : (
              <>Create Account <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;