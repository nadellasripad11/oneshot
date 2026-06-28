'use client';

import { useState } from 'react';
import { Search, Filter, Trash2, Download, CheckCircle, Loader, Clock } from 'lucide-react';

interface Task {
  id: string;
  goal: string;
  type: string;
  status: 'completed' | 'in_progress' | 'pending';
  createdAt: string;
  duration: string;
  credits: number;
}

const allTasks: Task[] = [
  {
    id: '1',
    goal: 'Build a landing page for my AI startup',
    type: 'Design & Code',
    status: 'completed',
    createdAt: '2 hours ago',
    duration: '8m 32s',
    credits: 12,
  },
  {
    id: '2',
    goal: 'Create a marketing strategy for Q2',
    type: 'Marketing',
    status: 'completed',
    createdAt: '5 hours ago',
    duration: '5m 12s',
    credits: 8,
  },
  {
    id: '3',
    goal: 'Research top 10 competitors in the AI space',
    type: 'Research',
    status: 'completed',
    createdAt: '1 day ago',
    duration: '12m 45s',
    credits: 15,
  },
  {
    id: '4',
    goal: 'Generate social media content calendar',
    type: 'Content',
    status: 'completed',
    createdAt: '2 days ago',
    duration: '6m 18s',
    credits: 9,
  },
];

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const filterType = null;

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in_progress':
        return <Loader className="w-5 h-5 text-accent animate-spin" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.goal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterType || task.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">All Tasks</h1>
        <p className="text-text-secondary">View and manage all your completed and in-progress tasks.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
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
        <button className="flex items-center gap-2 px-4 py-2 border border-border-light rounded-lg text-text-secondary hover:text-text-primary transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light bg-bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Goal</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Credits</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-border-light hover:bg-bg-secondary transition-colors">
                    <td className="px-6 py-4 text-sm text-text-primary font-medium max-w-xs truncate">
                      {task.goal}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{task.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="text-sm capitalize">{task.status.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{task.duration}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{task.credits}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{task.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-text-secondary hover:text-accent transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-text-secondary hover:text-error transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-text-secondary">No tasks found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
