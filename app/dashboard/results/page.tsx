'use client';

import { useEffect, useState } from 'react';
import { Download, Trash2, Copy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface SavedResult {
  id: string;
  goal: string;
  category: string;
  result: string;
  created_at: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<SavedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
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
        setResults(data || []);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const copyResult = (id: string, result: string) => {
    navigator.clipboard.writeText(result);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadResult = (goal: string, result: string) => {
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
        <h1 className="text-3xl font-bold text-text-primary mb-2">Saved Results</h1>
        <p className="text-text-secondary">All your completed tasks</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading results...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-border-light">
          <p className="text-text-secondary mb-4">No results yet</p>
          <Link
            href="/dashboard/new-task"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90"
          >
            <Plus className="w-4 h-4" />
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-lg border border-border-light p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">{result.goal}</h3>
              <p className="text-sm text-text-secondary mb-4 capitalize">{result.category}</p>

              <div className="bg-bg-secondary rounded-lg p-4 mb-4 max-h-48 overflow-y-auto whitespace-pre-wrap text-sm text-text-primary leading-relaxed">
                {result.result}
              </div>

              <p className="text-xs text-text-secondary mb-4">
                {new Date(result.created_at).toLocaleString()}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => copyResult(result.id, result.result)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                    copied === result.id
                      ? 'bg-success text-white'
                      : 'border border-border-light text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  {copied === result.id ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => downloadResult(result.goal, result.result)}
                  className="flex items-center gap-2 px-3 py-2 border border-border-light text-text-primary rounded-lg font-medium hover:bg-bg-secondary transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-border-light text-text-secondary rounded-lg font-medium hover:text-error transition-all text-sm ml-auto">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
