import { Link } from "react-router-dom";

const Register = () => {


    


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
        <div className="auth-header mb-8">
          <h1 className="auth-title text-[27px] text-foreground mb-2 font-bold">
            Create an account
          </h1>
          <p className="auth-subtitle text-[14px]">
            Start managing{" "}
            <span className="text-primary">your funding</span>{" "}
            <span className="text-primary/70">campaigns</span>
          </p>
        </div>

        <form className="form flex flex-col gap-4 mb-5">
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Full name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input border border-border rounded-lg focus:ring focus:border-ring"
              placeholder="John Doe"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input border border-border rounded-lg focus:ring focus:border-ring"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input border border-border rounded-lg focus:ring focus:border-ring"
              placeholder="At least 6 characters"
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input border border-border rounded-lg focus:ring focus:border-ring"
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary bg-primary text-white cursor-pointer hover:bg-primary/50"
          >
            Create account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
