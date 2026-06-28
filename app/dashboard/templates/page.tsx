'use client';

import { useRouter } from 'next/navigation';
import {
  FileText,
  Globe,
  Mail,
  BarChart3,
  BookOpen,
  Lightbulb,
  Briefcase,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const templates = [
  {
    id: '1',
    name: 'Business Plan',
    description: 'Create a comprehensive business plan with market analysis and financials.',
    icon: Briefcase,
    category: 'Business',
    prompt: 'Create a detailed business plan including executive summary, market analysis, competitive landscape, revenue model, and financial projections for the next 3 years.',
  },
  {
    id: '2',
    name: 'Landing Page',
    description: 'Build a high-converting landing page with copy and design recommendations.',
    icon: Globe,
    category: 'Design',
    prompt: 'Design a high-converting landing page with compelling headline, value proposition, benefits, features, social proof, call-to-action, and design recommendations.',
  },
  {
    id: '3',
    name: 'Sales Email Sequence',
    description: 'Generate a series of persuasive sales emails with subject lines.',
    icon: Mail,
    category: 'Sales',
    prompt: 'Create a 5-email sales sequence with subject lines, body copy, and call-to-action for a B2B SaaS product. Include hook, value prop, social proof, objection handling, and close.',
  },
  {
    id: '4',
    name: 'Research Report',
    description: 'Produce an in-depth market or competitor research report with citations.',
    icon: BarChart3,
    category: 'Research',
    prompt: 'Write a comprehensive research report analyzing market trends, top competitors, market size, growth potential, and key insights with actionable recommendations.',
  },
  {
    id: '5',
    name: 'Study Guide',
    description: 'Create a comprehensive study guide with summaries and practice questions.',
    icon: BookOpen,
    category: 'Education',
    prompt: 'Create a study guide with key concepts, detailed explanations, diagrams/charts, practice questions, and answers for comprehensive understanding.',
  },
  {
    id: '6',
    name: 'Marketing Strategy',
    description: 'Develop a full marketing strategy with channels, messaging, and KPIs.',
    icon: Lightbulb,
    category: 'Marketing',
    prompt: 'Develop a 6-month marketing strategy including target audience, positioning, marketing channels, campaign ideas, content calendar, metrics, and budget allocation.',
  },
  {
    id: '7',
    name: 'Product Requirements',
    description: 'Write detailed PRD with user stories, acceptance criteria, and mockups.',
    icon: FileText,
    category: 'Product',
    prompt: 'Write a Product Requirements Document (PRD) including product vision, user personas, user stories with acceptance criteria, features, technical requirements, and success metrics.',
  },
  {
    id: '8',
    name: 'Investor Pitch',
    description: 'Create a compelling pitch deck with financial projections.',
    icon: Sparkles,
    category: 'Business',
    prompt: 'Create a compelling investor pitch including problem statement, solution, market opportunity, business model, traction, team, financial projections, and ask.',
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  const useTemplate = (template: typeof templates[0]) => {
    // Store template in sessionStorage and redirect to new-task
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('templatePrompt', template.prompt);
      sessionStorage.setItem('templateCategory', template.category);
    }
    router.push('/dashboard/new-task');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Templates</h1>
        <p className="text-text-secondary">
          Pre-built workflows optimized for specific use cases. Pick one and customize it.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => useTemplate(template)}
              className="group p-6 bg-white rounded-lg border border-border-light hover:shadow-lg hover:border-accent transition-all text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-8 h-8 text-accent" />
                <span className="px-2 py-1 text-xs font-medium bg-bg-secondary text-text-secondary rounded">
                  {template.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{template.name}</h3>
              <p className="text-sm text-text-secondary mb-4">{template.description}</p>
              <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                Use Template <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
