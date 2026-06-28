'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, Loader, Download, Share2, Copy, Save, ArrowLeft } from 'lucide-react';

interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  duration?: string;
  timestamp?: string;
}

const steps: ExecutionStep[] = [
  {
    id: '1',
    title: 'Understanding Goal',
    description: 'Analyzing your request and extracting objectives',
    status: 'completed',
    duration: '2.3s',
  },
  {
    id: '2',
    title: 'Planning Work',
    description: 'Breaking down into subtasks and defining approach',
    status: 'completed',
    duration: '3.1s',
  },
  {
    id: '3',
    title: 'Researching',
    description: 'Gathering information and context',
    status: 'in_progress',
    duration: '1.8s',
  },
  {
    id: '4',
    title: 'Creating',
    description: 'Generating content and outputs',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Reviewing',
    description: 'Quality checking and validation',
    status: 'pending',
  },
  {
    id: '6',
    title: 'Optimizing',
    description: 'Fine-tuning and improving results',
    status: 'pending',
  },
  {
    id: '7',
    title: 'Finalizing',
    description: 'Preparing deliverables for export',
    status: 'pending',
  },
];

export default function ExecutingPage() {
  const [currentSteps, setCurrentSteps] = useState(steps);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Simulate step progression
    const intervals: NodeJS.Timeout[] = [];

    // Simulate Research step completion
    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '3'
              ? { ...step, status: 'completed', duration: '4.2s' }
              : step.id === '4'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
      }, 3000)
    );

    // Simulate Creating step completion
    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '4'
              ? { ...step, status: 'completed', duration: '6.5s' }
              : step.id === '5'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
      }, 6000)
    );

    // Simulate Reviewing step completion
    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '5'
              ? { ...step, status: 'completed', duration: '3.2s' }
              : step.id === '6'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
      }, 9000)
    );

    // Simulate Optimizing step completion
    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '6'
              ? { ...step, status: 'completed', duration: '2.8s' }
              : step.id === '7'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
      }, 12000)
    );

    // Simulate completion
    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '7'
              ? { ...step, status: 'completed', duration: '1.5s' }
              : step
          )
        );
        setIsCompleted(true);
      }, 14000)
    );

    return () => intervals.forEach((interval) => clearTimeout(interval));
  }, []);

  const getStatusIcon = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'in_progress':
        return <Loader className="w-6 h-6 text-accent animate-spin" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-text-secondary" />;
    }
  };

  const totalDuration = currentSteps
    .filter((s) => s.duration)
    .reduce((acc, s) => {
      const match = s.duration?.match(/(\d+\.?\d*)/);
      return acc + (match ? parseFloat(match[0]) : 0);
    }, 0);

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-2xl">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-accent font-medium hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Build a landing page for my startup</h1>
        <p className="text-text-secondary">Executing with Grok & Gemini</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-text-primary">
            {currentSteps.filter((s) => s.status === 'completed').length} of {currentSteps.length} steps
          </p>
          <p className="text-sm text-text-secondary">{totalDuration.toFixed(1)}s total</p>
        </div>
        <div className="w-full h-2 bg-border-light rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{
              width: `${(currentSteps.filter((s) => s.status === 'completed').length / currentSteps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-4 mb-12">
        {currentSteps.map((step, idx) => (
          <div key={step.id} className="relative">
            {/* Connector Line */}
            {idx < currentSteps.length - 1 && (
              <div className="absolute left-3 top-12 w-0.5 h-12 bg-border-light" />
            )}

            {/* Step Card */}
            <div className="relative bg-white p-6 rounded-lg border border-border-light hover:shadow-md transition-all">
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{step.description}</p>
                  {step.duration && (
                    <p className="text-xs text-text-secondary mt-2">{step.duration}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion State */}
      {isCompleted && (
        <div className="animate-slide-in space-y-6">
          {/* Success Message */}
          <div className="bg-bg-secondary border border-border-light rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Your task is ready!</h2>
            <p className="text-text-secondary">
              All steps completed successfully. Your deliverables are below.
            </p>
          </div>

          {/* Result Preview */}
          <div className="bg-white border border-border-light rounded-lg p-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Deliverable Preview</h3>
            <div className="bg-bg-secondary rounded-lg p-6 mb-4 h-64 overflow-hidden">
              <p className="text-text-secondary text-sm">Landing page HTML, CSS, and components</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              <Download className="w-5 h-5" />
              Download
            </button>
            <button className="flex items-center justify-center gap-2 flex-1 px-6 py-3 border border-border-light text-text-primary rounded-lg font-semibold hover:bg-bg-secondary transition-all">
              <Copy className="w-5 h-5" />
              Copy
            </button>
            <button className="flex items-center justify-center gap-2 flex-1 px-6 py-3 border border-border-light text-text-primary rounded-lg font-semibold hover:bg-bg-secondary transition-all">
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <button className="flex items-center justify-center gap-2 flex-1 px-6 py-3 border border-border-light text-text-primary rounded-lg font-semibold hover:bg-bg-secondary transition-all">
              <Save className="w-5 h-5" />
              Save
            </button>
          </div>

          {/* New Task Button */}
          <Link
            href="/dashboard/new-task"
            className="block w-full px-6 py-3 text-center bg-bg-secondary text-text-primary rounded-lg font-semibold hover:bg-border-light transition-all"
          >
            Create Another Task
          </Link>
        </div>
      )}
    </div>
  );
}
