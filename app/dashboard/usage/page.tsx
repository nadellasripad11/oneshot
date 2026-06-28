'use client';

import { BarChart3, TrendingUp, Zap, Clock } from 'lucide-react';

export default function UsagePage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Usage</h1>
        <p className="text-text-secondary">Monitor your consumption and plan overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Credits Used', value: '45', icon: Zap, color: 'text-warning' },
          { label: 'Tasks Completed', value: '12', icon: TrendingUp, color: 'text-success' },
          { label: 'Time Saved', value: '24h 30m', icon: Clock, color: 'text-accent' },
          { label: 'Success Rate', value: '98%', icon: BarChart3, color: 'text-success' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-lg border border-border-light">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">{stat.label}</h3>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Usage by Type */}
      <div className="bg-white p-8 rounded-lg border border-border-light">
        <h2 className="text-xl font-bold text-text-primary mb-6">Credits by Type</h2>
        <div className="space-y-3">
          {[
            { label: 'Design & Code', credits: 12, percentage: 26 },
            { label: 'Research', credits: 15, percentage: 33 },
            { label: 'Marketing', credits: 8, percentage: 17 },
            { label: 'Writing', credits: 10, percentage: 24 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-text-primary">{item.label}</p>
                <p className="text-sm text-text-secondary">{item.credits} credits</p>
              </div>
              <div className="w-full h-2 bg-border-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
