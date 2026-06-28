'use client';

import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Task {
  id: string;
  goal: string;
  category: string;
  created_at: string;
  result: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          setLoading(false);
          return;
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Welcome back</h1>
        <p className="text-text-secondary">Ready to accomplish your next goal?</p>
      </div>

      {/* New Task CTA */}
      <div className="mb-8">
        <Link
          href="/dashboard/new-task"
          className="inline-flex items-center gap-3 px-6 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Task
        </Link>
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Recent Tasks</h2>
          <Link href="/dashboard/tasks" className="text-accent font-medium hover:underline">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg border border-border-light p-8 text-center">
            <p className="text-text-secondary">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg border border-border-light p-8 text-center">
            <p className="text-text-secondary mb-4">No tasks yet</p>
            <Link
              href="/dashboard/new-task"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90"
            >
              <Plus className="w-4 h-4" />
              Create Your First Task
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-border-light overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light bg-bg-secondary">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Goal</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-border-light hover:bg-bg-secondary transition-colors">
                      <td className="px-6 py-4 text-sm text-text-primary font-medium max-w-xs truncate">
                        {task.goal}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary capitalize">{task.category}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{formatDate(task.created_at)}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-text-secondary hover:text-error transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
