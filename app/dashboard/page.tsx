'use client';

import Link from 'next/link';
import { Plus, Zap, Loader, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  goal: string;
  type: string;
  status: 'completed' | 'in_progress' | 'pending';
  createdAt: string;
  duration: string;
  credits: number;
}

const recentTasks: Task[] = [
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
];

export default function Dashboard() {
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

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Good morning, Alex</h1>
        <p className="text-text-secondary">Ready to delegate your next task?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Tasks Completed', value: '5', icon: <CheckCircle className="w-6 h-6 text-success" /> },
          { label: 'Time Saved', value: '24h 30m', icon: <Zap className="w-6 h-6 text-accent" /> },
          { label: 'Credits Used', value: '45', icon: <Zap className="w-6 h-6 text-warning" /> },
          { label: 'Success Rate', value: '98%', icon: <CheckCircle className="w-6 h-6 text-success" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-border-light">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-text-secondary">{stat.label}</h3>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
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
      </div>
    </div>
  );
}
