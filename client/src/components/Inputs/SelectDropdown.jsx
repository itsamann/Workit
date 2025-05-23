import { React, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <button
        className="w-full text-sm text-black outline-none bg-white border border-gray-100 rounded-md px-2.5 py-3 flex items-center justify-between mt-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((item) => item.value === value)?.label
          : placeholder}
        <span className="ml-2">
          <LuChevronDown
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-md shadow-md">
          {options.map((item) => (
            <button
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className={`block w-full px-4 py-2 text-sm text-left ${
                item.value === value
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
