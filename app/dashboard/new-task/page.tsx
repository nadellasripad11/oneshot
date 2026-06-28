'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Brain, Code, Palette, Briefcase, TrendingUp, BookOpen, Globe } from 'lucide-react';

const goalTypes = [
  { id: 'research', label: 'Research', icon: Brain, color: 'text-blue-600' },
  { id: 'writing', label: 'Writing', icon: Sparkles, color: 'text-purple-600' },
  { id: 'coding', label: 'Coding', icon: Code, color: 'text-green-600' },
  { id: 'design', label: 'Design', icon: Palette, color: 'text-pink-600' },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'text-orange-600' },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp, color: 'text-red-600' },
  { id: 'education', label: 'Education', icon: BookOpen, color: 'text-yellow-600' },
  { id: 'general', label: 'General', icon: Globe, color: 'text-indigo-600' },
];

const exampleGoals = [
  'Build a landing page for my startup',
  'Create a marketing strategy for Q2',
  'Research top 10 competitors',
  'Generate a business plan',
  'Write a sales email sequence',
  'Design a product mockup',
];

export default function NewTaskPage() {
  const [goal, setGoal] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // Redirect to task execution page
      window.location.href = '/dashboard/executing/1';
    }, 500);
  };

  const handleExampleClick = (example: string) => {
    setGoal(example);
  };

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-2">What would you like accomplished?</h1>
        <p className="text-text-secondary">Describe your goal in plain English. OneShot will handle the rest.</p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Goal Input */}
        <div className="space-y-4">
          <div>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="What would you like accomplished?"
              className="w-full px-6 py-4 bg-white border border-border-light rounded-lg text-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none h-32"
            />
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <p className="text-sm text-text-secondary font-medium">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {exampleGoals.map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className="px-3 py-2 text-sm bg-bg-secondary border border-border-light rounded-lg text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Goal Type Selector */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-4">
              What type of task is this?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {goalTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'border-accent bg-accent bg-opacity-5'
                        : 'border-border-light hover:border-accent'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-accent' : 'text-text-secondary'}`} />
                    <span className={`text-sm font-medium ${isSelected ? 'text-accent' : 'text-text-secondary'}`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!goal.trim() || isSubmitting}
            className="flex-1 px-6 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Executing...' : 'Execute'}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-4 border border-border-light text-text-primary rounded-lg font-semibold hover:bg-bg-secondary transition-all"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-12 p-6 bg-bg-secondary rounded-lg border border-border-light">
        <h3 className="font-semibold text-text-primary mb-3">How it works:</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li className="flex gap-3">
            <span className="font-bold text-accent">1.</span>
            <span>Describe your goal in natural language</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent">2.</span>
            <span>OneShot analyzes and breaks down your request</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent">3.</span>
            <span>Multi-agent workflows execute in parallel</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent">4.</span>
            <span>Results are self-critiqued and optimized</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent">5.</span>
            <span>You get a polished, ready-to-use result</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
