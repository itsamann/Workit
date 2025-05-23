import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#00BC7D";
      case "Medium":
        return "#FF9900";
      case "High":
        return "#FF1F57";
      default:
        return "#00BC7D";
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 p-2 rounded-lg shadow-md">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {`Level: ${payload[0].payload.priority}`}
          </p>
          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="font-medium text-sm text-gray-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="priority" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="count"
            nameKey="priority"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {Array.isArray(data) &&
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
