import { useForm } from "react-hook-form";
import { registerUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Registration Successful!");

      reset();

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Name"
            className="border p-3 w-full rounded mb-2"
          />

          <p className="text-red-500 text-sm">
            {errors.name?.message}
          </p>

          <input
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            className="border p-3 w-full rounded mt-3 mb-2"
          />

          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            placeholder="Password"
            className="border p-3 w-full rounded mt-3 mb-2"
          />

          <p className="text-red-500 text-sm">
            {errors.password?.message}
          </p>

          <button
            disabled={isSubmitting}
            className="bg-blue-600 text-white w-full p-3 rounded mt-5 hover:bg-blue-700"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;