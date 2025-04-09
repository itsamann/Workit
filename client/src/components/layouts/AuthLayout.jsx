import React from "react";
import { Link, useLocation } from "react-router-dom";

function AuthLayout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Check if it's the login page

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-[Poppins] bg-white">
      {/* Left Panel (Form Side) */}
      <div className="w-full md:w-[55%] px-8 sm:px-14 py-12 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600 mb-10 tracking-tight">
            Workit
          </h1>
          {children}
        </div>
        <p className="text-sm text-gray-400 text-center mt-10">
          © {new Date().getFullYear()} Workit. All rights reserved.
        </p>
      </div>

      {/* Right Panel (Visual Side) */}
      <div className="hidden md:flex w-[45%] relative items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
        {/* Decorative Blur Circles */}
        <div className="absolute -top-32 -left-24 w-80 h-80 bg-purple-300 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-24 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-2xl" />
        <div className="absolute top-0 right-1/3 w-52 h-52 bg-pink-300 opacity-20 rounded-full blur-2xl" />

        {/* Glassmorphic Box */}
        <div className="relative z-10 backdrop-blur-2xl bg-white/20 border border-white/30 shadow-xl rounded-3xl p-10 max-w-[85%] text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 leading-tight">
            Welcome to <span className="text-blue-600">Workit</span>
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Your Smart Productivity Hub, Where Tasks and Teamwork Meet.
          </p>
          <Link
            className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-blue-700 transition duration-200 shadow-md"
            to={isLoginPage ? "/signup" : "/login"} // Switch routes dynamically
          >
            {isLoginPage ? "Register" : "Login"}{" "}
            {/* Change button text based on page */}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
