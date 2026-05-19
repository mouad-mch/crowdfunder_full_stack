import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, login } from "../store/slices/authSlice.js";
import toast from "react-hot-toast";

const Login = () => {

  const [form, setForm] = useState({})

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const emailError = error && error.toLowerCase().includes("email");
  const passwordError = error && error.toLowerCase().includes("password") && !emailError;
  const oderError = error && !passwordError ;

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await dispatch(login(form));

    if (login.fulfilled.match(result)) {
      toast.success('login success')
      navigate("/");
    }
  };

  const isLoading = status === "loading";

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <div className="flex items-center gap-2 h-16 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <span className="text-lg font-semibold tracking-tight">
          InvoiceFund
        </span>
      </div>

      <div className="auth-card w-full max-w-112.5 rounded-lg p-5 border border-border shadow-lg shadow-primary/50">
      {
        oderError && (
             <p className="text-red-500 text-md font-midum mt-1 w-full p-3 rounded-lg border border-red-500 bg-red-400/15">{error}</p>
        )
      }
        <div className="auth-header mb-8">
          <h1 className="auth-title text-[27px] text-foreground mb-2 font-bold">
            Welcome back
          </h1>
          <p className="auth-subtitle text-foreground/60 text-[14px]">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form flex flex-col gap-4 mb-5">
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className={`form-input border rounded-lg focus:ring focus:border-ring ${emailError ? "border-red-500" : "border-border"}`}
              value={form.email ?? ""}
              onChange={(e) => handleChange(e)}
              placeholder="you@example.com"
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              className={`form-input border rounded-lg focus:ring focus:border-ring ${passwordError ? "border-red-500" : "border-border"}`}
              value={form.password ?? ""}
              onChange={(e) => handleChange(e)}
              placeholder="••••••••"
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary bg-primary text-white cursor-pointer hover:bg-primary/50"
          >
            { isLoading ? "Signign in...": "Sign in" }
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
