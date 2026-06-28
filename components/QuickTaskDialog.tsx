'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const templates = [
  { name: 'Business Plan', prompt: 'Create a detailed business plan...' },
  { name: 'Landing Page', prompt: 'Design a high-converting landing page...' },
  { name: 'Marketing Strategy', prompt: 'Develop a 6-month marketing strategy...' },
  { name: 'Sales Email', prompt: 'Create a 5-email sales sequence...' },
  { name: 'Research Report', prompt: 'Write a comprehensive research report...' },
  { name: 'Study Guide', prompt: 'Create a study guide with key concepts...' },
];

export default function QuickTaskDialog({ isOpen, onClose }: QuickTaskDialogProps) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 pointer-events-none">
        <div className="bg-white rounded-lg w-full max-w-xl shadow-2xl pointer-events-auto">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-light">
            <Search className="w-5 h-5 text-text-secondary" />
            <input
              autoFocus
              type="text"
              placeholder="Search templates or describe your task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-text-primary placeholder-text-secondary focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-bg-secondary rounded transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      sessionStorage.setItem('templatePrompt', template.prompt);
                    }
                    router.push('/dashboard/new-task');
                    onClose();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-bg-secondary border-b border-border-light last:border-0 transition-colors"
                >
                  <p className="font-medium text-text-primary">{template.name}</p>
                  <p className="text-sm text-text-secondary truncate">{template.prompt}</p>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-text-secondary">No templates found</p>
              </div>
            )}
          </div>

          {/* Hint */}
          <div className="px-4 py-2 text-xs text-text-secondary bg-bg-secondary">
            Press <kbd className="px-2 py-1 bg-white border border-border-light rounded">ESC</kbd> to close
          </div>
        </div>
      </div>
    </>
  );
}
