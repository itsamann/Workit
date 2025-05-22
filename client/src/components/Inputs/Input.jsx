import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      {label && (
        <label className="text-[13px] text-slate-800 font-medium mb-2 block">
          {label}
        </label>
      )}
      <div className="flex items-center border border-slate-300 px-3 py-2 rounded-md bg-white focus-within:border-primary">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="current-password"
          className="w-full bg-transparent outline-none text-sm"
        />
        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
