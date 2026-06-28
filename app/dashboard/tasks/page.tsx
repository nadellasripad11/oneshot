'use client';

import { useState, useEffect } from 'react';
import { Search, Trash2, Download } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  goal: string;
  category: string;
  created_at: string;
  result: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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
          .order('created_at', { ascending: false });

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
    return new Date(dateString).toLocaleString();
  };

  const filteredTasks = tasks.filter((task) =>
    task.goal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadTask = (goal: string, result: string) => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${goal.substring(0, 30)}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">All Tasks</h1>
        <p className="text-text-secondary">Browse and download all your completed tasks.</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-white border border-border-light rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-border-light">
          <p className="text-text-secondary mb-4">
            {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your search'}
          </p>
          {tasks.length === 0 && (
            <Link
              href="/dashboard/new-task"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90"
            >
              <Plus className="w-4 h-4" />
              Create Your First Task
            </Link>
          )}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-border-light hover:bg-bg-secondary transition-colors">
                    <td className="px-6 py-4 text-sm text-text-primary font-medium max-w-xs truncate">
                      {task.goal}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary capitalize">{task.category}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{formatDate(task.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => downloadTask(task.goal, task.result)}
                          className="text-text-secondary hover:text-accent transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-text-secondary hover:text-error transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
