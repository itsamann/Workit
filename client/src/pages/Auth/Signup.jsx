import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/input";
import { Link } from "react-router-dom";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter a valid name.");
      return;
    }
    if (ivaidateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }

    setError("");

    // Simulate an API call
  };

  return (
    <AuthLayout>
      <div className="lg:w-[to-100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={fullName}
              label={"Full Name"}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Aman Sharma"
            />
            <Input
              type="text"
              value={email}
              label={"Email"}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="heyaman.dev@gmail.com"
            />
            <Input
              type="password"
              value={password}
              label={"Password"}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Minimum 8 characters"
            />
            <Input
              type="text"
              value={adminInviteToken}
              label={"6 Digit Invite Token"}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              placeholder="Enter your invite token"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
          <p className="text-{13px} text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
