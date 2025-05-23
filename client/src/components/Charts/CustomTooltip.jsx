const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-md">
        <p className="text-xs font-semibold text-purple-800 mb-1">{`Status: ${payload[0].name}`}</p>
        <p className="text-sm text-gray-600">
          Count:{" "}
          <span className="font-medium text-sm text-gray-900">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
