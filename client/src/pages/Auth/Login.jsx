import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(null);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    setError("");

    setLoading(true);

    // Simulate an API call
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="Email Address"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Password"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>
          <p className="text-{13px} text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
