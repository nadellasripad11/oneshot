'use client';

import { X, Download, Copy } from 'lucide-react';
import { useState } from 'react';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: string;
  goal: string;
}

export default function ResultModal({ isOpen, onClose, result, goal }: ResultModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResult = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${goal.substring(0, 30)}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-light">
            <h2 className="text-2xl font-bold text-text-primary">{goal}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-text-secondary" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="whitespace-pre-wrap text-text-primary leading-relaxed font-normal">
              {result}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-border-light">
            <button
              onClick={copyResult}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                copied
                  ? 'bg-success text-white'
                  : 'border border-border-light text-text-primary hover:bg-bg-secondary'
              }`}
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy All'}
            </button>
            <button
              onClick={downloadResult}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-border-light text-text-primary rounded-lg font-semibold hover:bg-bg-secondary transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
