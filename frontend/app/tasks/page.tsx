"use client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { apiAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <main className="p-8 max-w-3xl mx-auto space-y-6">
        <Card title="New Task">
          <form onSubmit={createTask} className="space-y-3">
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm shadow-sm focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm shadow-sm focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <Button type="submit">Create</Button>
          </form>
        </Card>

        <Card title="Your Tasks">
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li key={t._id} className="rounded-lg border border-[var(--border)] p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{t.title}</h3>
                    <p className="text-sm text-[var(--foreground)]/70">{t.description}</p>
                  </div>
                  <span className="text-xs bg-[var(--border)] text-[var(--foreground)]/70 px-2 py-1 rounded">{t.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  );
}