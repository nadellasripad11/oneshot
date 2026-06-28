'use client';

import { Star, Download, Share2, Trash2, ExternalLink } from 'lucide-react';

interface SavedResult {
  id: string;
  title: string;
  goal: string;
  type: string;
  savedAt: string;
  favorite: boolean;
}

const savedResults: SavedResult[] = [
  {
    id: '1',
    title: 'AI Startup Landing Page',
    goal: 'Build a landing page for my AI startup',
    type: 'Design & Code',
    savedAt: '2 hours ago',
    favorite: true,
  },
  {
    id: '2',
    title: 'Q2 Marketing Strategy',
    goal: 'Create a marketing strategy for Q2',
    type: 'Marketing',
    savedAt: '5 hours ago',
    favorite: true,
  },
  {
    id: '3',
    title: 'Competitor Analysis Report',
    goal: 'Research top 10 competitors in the AI space',
    type: 'Research',
    savedAt: '1 day ago',
    favorite: false,
  },
  {
    id: '4',
    title: 'Social Media Content Calendar',
    goal: 'Generate social media content calendar',
    type: 'Content',
    savedAt: '2 days ago',
    favorite: false,
  },
];

export default function ResultsPage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Saved Results</h1>
        <p className="text-text-secondary">View and manage all your saved deliverables.</p>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {savedResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg border border-border-light p-6 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-text-primary">{result.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{result.goal}</p>
              </div>
              <button className="text-text-secondary hover:text-accent transition-colors">
                <Star
                  className="w-5 h-5"
                  fill={result.favorite ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border-light">
              <span className="px-2 py-1 text-xs font-medium bg-bg-secondary text-text-secondary rounded">
                {result.type}
              </span>
              <span className="text-xs text-text-secondary">{result.savedAt}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all text-sm">
                <ExternalLink className="w-4 h-4" />
                View
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border-light text-text-secondary rounded-lg hover:text-text-primary transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border-light text-text-secondary rounded-lg hover:text-text-primary transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border-light text-text-secondary rounded-lg hover:text-error transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
