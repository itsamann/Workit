import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="text-slate-700 dark:text-slate-200">
      <p className="text-sm leading-relaxed">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 border border-transparent rounded-lg px-4 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 dark:focus:ring-rose-500 dark:focus:ring-offset-slate-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
