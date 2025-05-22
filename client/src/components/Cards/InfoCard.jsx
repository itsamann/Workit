import React from "react";

const InfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Color Dot */}
      <div className={`w-2 h-2 md:w-3 md:h-3 ${color} rounded-full`} />

      {/* Info Text */}
      <p className="text-xs md:text-sm text-gray-500">
        <span className="text-sm md:text-base text-black font-semibold">
          {value}
        </span>{" "}
        {label}
      </p>
    </div>
  );
};

export default InfoCard;
