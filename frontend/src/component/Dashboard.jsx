import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./Popup";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    dueDate: ""
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/backend/user`);
      console.log("API Data: ", res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error in fetching users: ", error);
    }
  };

  // ✅ Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/backend/taskRoutes`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error in fetching tasks:", error);
    }
  };

  // ✅ Run once on mount
  useEffect(() => {
    console.log("useEffect triggered");
    fetchUsers();
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("users updated:", users);
  }, [users]);

  console.log("users: ", users);

  // ✅ Create Task
  const createTask = async () => {
    try {
      await axios.post(`${backendUrl}/backend/taskRoutes`, newTask);
      setStatus("success");
      setMessage("Task created successfully ✅");

      setNewTask({
        title: "",
        assignedTo: "",
        dueDate: ""
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  // ✅ Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${backendUrl}/backend/taskRoutes/${id}`);
      setStatus("success");
      setMessage("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${backendUrl}/backend/taskRoutes/${id}`, { status });
      setStatus("success");
      setMessage("Task updated successfully");
      fetchTasks();
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  // ✅ Filtering
  const filteredTasks = tasks.filter((task) => {
    if (role !== "Admin" && task.assignedTo !== user) return false;

    if (filter === "Completed") return task.status === "Completed";
    if (filter === "Pending") return task.status === "Pending";
    if (filter === "Overdue") {
      return new Date(task.dueDate) < new Date() && task.status !== "Completed";
    }
    return true;
  });

  // ✅ Stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    overdue: tasks.filter(
      (t) =>
        new Date(t.dueDate) < new Date() &&
        t.status !== "Completed"
    ).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-100 px-4 md:px-8 lg:px-12 py-6 mt-20">
      <Popup status={status} message={message} />

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
        </div>

        <div className="bg-green-100 shadow rounded-xl p-4">
          <p className="text-green-700 text-sm">Completed</p>
          <h2 className="text-2xl font-bold">{stats.completed}</h2>
        </div>

        <div className="bg-yellow-100 shadow rounded-xl p-4">
          <p className="text-yellow-700 text-sm">Pending</p>
          <h2 className="text-2xl font-bold">{stats.pending}</h2>
        </div>

        <div className="bg-red-100 shadow rounded-xl p-4">
          <p className="text-red-700 text-sm">Overdue</p>
          <h2 className="text-2xl font-bold">{stats.overdue}</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Completed", "Pending", "Overdue"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-indigo-500 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Create Task */}
      {role === "Admin" && (
        <div className="bg-white p-4 rounded-xl shadow mb-6 ">
          <h2 className="font-semibold mb-3">Create Task</h2>

          <input
            type="text"
            placeholder="Task title"
            className="border p-2 mr-2 rounded"
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setNewTask({ ...newTask, assignedTo: e.target.value })
            }
            className="border p-2 mr-2 rounded mt-2"
          >
            <option value="">Select User</option>

            {users
              .filter((u) => u.role === "User")
              .map((u) => (
                <option key={u._id} value={u.username}>
                  {u.username}
                </option>
              ))}
          </select>

          <input
            type="date"
            className="border p-2 mr-2 rounded"
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />

          <button
            onClick={createTask}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Create
          </button>
        </div>
      )}

      {/* Task List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks available</p>
        ) : (
          filteredTasks.map((task) => {
            const isOverdue =
              new Date(task.dueDate) < new Date() &&
              task.status !== "Completed";

            return (
              <div
                key={task._id}
                className={`bg-white shadow-md rounded-xl p-5 border-l-4 ${
                  isOverdue
                    ? "border-red-500"
                    : task.status === "Completed"
                    ? "border-green-500"
                    : "border-yellow-500"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Assigned to:{" "}
                  <span className="font-medium">{task.assignedTo}</span>
                </p>

                <p className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toDateString()}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    task.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>

                {isOverdue && (
                  <p className="text-red-500 text-xs mt-1">Overdue ⚠️</p>
                )}

               {(role === "User" && task.assignedTo === user) && (
                  <button
                    onClick={() => 
                       updateStatus(
                         task._id,
                         task.stats === "Pending" ? "Completed" : "Pending"
                       )
                    }
                    className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg"
                  >
                    Mark as {task.stats === "Pending" ? "Completed" : "Pending"}
                  </button>
               )}
                
                {(role === "Admin" || task.assignedTo === user) && (
                  <button
                    onClick={() =>
                      updateStatus(
                        task._id,
                        task.status === "Pending"
                          ? "Completed"
                          : "Pending"
                      )
                    }
                    className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg"
                  >
                    Toggle Status
                  </button>
                )}

                {role === "Admin" && (
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;