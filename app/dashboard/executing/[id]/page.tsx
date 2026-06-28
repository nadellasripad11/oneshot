'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, Loader, Download, Share2, Copy, Save, ArrowLeft, Maximize2 } from 'lucide-react';
import ResultModal from '@/components/ResultModal';

interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  duration?: string;
}

const steps: ExecutionStep[] = [
  {
    id: '1',
    title: 'Understanding Goal',
    description: 'Analyzing your request and extracting objectives',
    status: 'completed',
    duration: '0.5s',
  },
  {
    id: '2',
    title: 'Planning Work',
    description: 'Breaking down into subtasks and defining approach',
    status: 'completed',
    duration: '0.3s',
  },
  {
    id: '3',
    title: 'Researching',
    description: 'Gathering information and context',
    status: 'in_progress',
    duration: '1.2s',
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

interface TaskResult {
  goal: string;
  category: string;
  result: string;
  timestamp: string;
}

export default function ExecutingPage() {
  const [currentSteps, setCurrentSteps] = useState(steps);
  const [isCompleted, setIsCompleted] = useState(false);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(28); // Start at 28% since 2 steps are pre-completed

  useEffect(() => {
    // Get task result from sessionStorage
    const stored = sessionStorage.getItem('taskResult');
    if (stored) {
      try {
        setTaskResult(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse task result');
      }
    }

    // Simulate step progression
    const intervals: NodeJS.Timeout[] = [];

    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '3'
              ? { ...step, status: 'completed', duration: '1.8s' }
              : step.id === '4'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
        setProgress(43); // 3/7 steps
      }, 2000)
    );

    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '4'
              ? { ...step, status: 'completed', duration: '3.2s' }
              : step.id === '5'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
        setProgress(57); // 4/7 steps
      }, 4000)
    );

    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '5'
              ? { ...step, status: 'completed', duration: '1.5s' }
              : step.id === '6'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
        setProgress(71); // 5/7 steps
      }, 6000)
    );

    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '6'
              ? { ...step, status: 'completed', duration: '1.2s' }
              : step.id === '7'
              ? { ...step, status: 'in_progress' }
              : step
          )
        );
        setProgress(86); // 6/7 steps
      }, 8000)
    );

    intervals.push(
      setTimeout(() => {
        setCurrentSteps((prev) =>
          prev.map((step) =>
            step.id === '7'
              ? { ...step, status: 'completed', duration: '0.8s' }
              : step
          )
        );
        setProgress(100);
        setIsCompleted(true);
      }, 10000)
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
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {taskResult?.goal || 'Executing task...'}
        </h1>
        <p className="text-text-secondary">
          {taskResult?.category ? `Category: ${taskResult.category}` : 'Executing with Gemini'}
        </p>
      </div>

      {/* Progress Section */}
      <div className="mb-12">
        {/* Large Percentage Display */}
        <div className="mb-6 text-center">
          <div className="text-6xl font-bold text-accent mb-2">{progress}%</div>
          <p className="text-text-secondary">
            {isCompleted ? 'Complete!' : 'Executing task...'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-border-light rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* Steps Counter */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-text-secondary">
            {currentSteps.filter((s) => s.status === 'completed').length} of {currentSteps.length} steps complete
          </p>
          <p className="text-sm text-text-secondary">{totalDuration.toFixed(1)}s elapsed</p>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Your Result</h3>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1 text-sm text-accent hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
                Expand
              </button>
            </div>
            <div className="bg-bg-secondary rounded-lg p-6 mb-4 max-h-96 overflow-y-auto whitespace-pre-wrap text-text-primary text-sm leading-relaxed">
              {taskResult?.result || 'Processing...'}
            </div>
          </div>

          {/* Result Modal */}
          <ResultModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            result={taskResult?.result || ''}
            goal={taskResult?.goal || 'Task Result'}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([taskResult?.result || ''], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = `oneshot-result-${Date.now()}.txt`;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(taskResult?.result || '');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className={`flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                copied
                  ? 'bg-success text-white border-success'
                  : 'border border-border-light text-text-primary hover:bg-bg-secondary'
              }`}
            >
              <Copy className="w-5 h-5" />
              {copied ? '✓ Copied!' : 'Copy'}
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
