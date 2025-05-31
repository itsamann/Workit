import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profilePic}
            alt={`User Avatar`}
            className="w-12 h12 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;
const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20";
      case "Completed":
        return "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20";
      default:
        return "text-violet-500 bg-violet-50 dark:bg-violet-900/20";
    }
  };

  return (
    <div
      className={`flex-1 text-[11px] font-medium px-4 py-2 rounded-xl shadow-sm border dark:border-slate-700 ${getStatusTagColor()}`}
    >
      <span className="text-[14px] font-bold block mb-1">{count}</span>
      {label}
    </div>
  );
};
