"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiAuth } from "@/lib/api";
import { useAuth } from "../../context/AuthContext";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  dueDate?: string;
  assignee?: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in_progress" | "done">("todo");
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    loadTasks();
  }, [token]);

  async function loadTasks() {
    try {
      const data = await apiAuth<Task[]>("/tasks", token!);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    try {
      const created = await apiAuth<Task>("/tasks", token, {
        method: "POST",
        body: JSON.stringify({ title, description, status }),
      });
      setTasks((prev) => [created, ...prev]);
      setTitle("");
      setDescription("");
      setStatus("todo");
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="p-8">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <button onClick={logout} className="text-sm text-red-600 underline">
          Logout
        </button>
      </header>
      <main className="p-8 max-w-3xl mx-auto">
        <form onSubmit={createTask} className="bg-white rounded shadow p-4 mb-6">
          <h2 className="font-medium mb-2">New Task</h2>
          <input
            className="w-full border p-2 mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full border p-2 mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="w-full border p-2 mb-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
        </form>

        <ul className="space-y-3">
          {tasks.map((t) => (
            <li key={t._id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{t.title}</h3>
                  <p className="text-sm text-gray-600">{t.description}</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{t.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}