import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Trash2, CheckCircle, Circle, Plus } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const fetchTasks = async () => {
    const response = await axios.get(
      "https://mern-todo-list-80dd.onrender.com/api/tasks/all",
    );
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const addTask = async () => {
    if (!title) return;
    await axios.post("https://mern-todo-list-80dd.onrender.com/api/tasks/add", {
      title,
    });
    setTitle("");
    fetchTasks();
  };
  const deleteTask = async (id) => {
    await axios.delete(
      `https://mern-todo-list-80dd.onrender.com/api/tasks/delete/${id}`,
    );
    fetchTasks();
  };
  const toggleComplete = async (id, status) => {
    await axios.put(
      `https://mern-todo-list-80dd.onrender.com/api/tasks/update/${id}`,
      {
        completed: !status,
      },
    );
    fetchTasks("");
  };
  return (
    <div
      style={{
        backgroundColor: "palegoldenrod",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          width: "400px",
          backgroundColor: "burlywood",
          border: "solid brown 1px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>
          Kajendran's Tasks 📝
        </h2>

        {/* Input Box Area */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid brown",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button
            onClick={addTask}
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              border: "1px solid green",
            }}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Task List Area */}
        <div>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
                onClick={() => toggleComplete(task._id, task.completed)}
              >
                {task.completed ? (
                  <CheckCircle color="green" />
                ) : (
                  <Circle color="orange" />
                )}
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#888" : "#333",
                    fontWeight: "bold",
                  }}
                >
                  {task.title}
                </span>
              </div>
              <Trash2
                size={18}
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => deleteTask(task._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
