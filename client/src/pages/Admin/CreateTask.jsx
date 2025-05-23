import { React, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUser";

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearData = () => {
    //reset form data
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });

    // create task
    const createTask = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          API_PATHS.TASKS.CREATE_TASK,
          taskData
        );
        if (response.status === 200) {
          toast.success("Task created successfully");
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error creating task:", error);
        toast.error("Error creating task");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-red-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:bg-rose-300 transition duration-200 ease-in-out cursor-pointer"
                  onClick={() => {
                    setOpenDeleteAlert(true);
                  }}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>

              <input
                type="text"
                value={taskData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}
                className="form-input"
                placeholder="Create App UI"
              />
            </div>

            <div className="text-xs font-medium text-slate-600 mt-4">
              <label className="">Task Description</label>
              <textarea
                value={taskData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
                className="form-input"
                rows={4}
                placeholder="Describe the task"
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>

                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  placeholder={"Select Priority"}
                  onChange={(e) =>
                    handleValueChange("priority", e.target.value)
                  }
                  className="form-input"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => handleValueChange("dueDate", e.target.value)}
                  className="form-input"
                  placeholder="Select Due Date"
                />
              </div>

              <div className="col-span-6 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assigned To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
