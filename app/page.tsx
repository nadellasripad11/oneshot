'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Zap, Brain, Sparkles, GitBranch, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const examples = [
  {
    title: 'Build a landing page',
    prompt: 'Create a modern landing page for an AI productivity tool with hero section, features, pricing, and CTA buttons',
    result: 'Complete HTML/CSS/JS landing page ready to deploy'
  },
  {
    title: 'Create a marketing strategy',
    prompt: 'Develop a comprehensive Q3 marketing strategy for a SaaS product targeting startups',
    result: '30-day tactical plan with content calendar and promotion channels'
  },
  {
    title: 'Research competitors',
    prompt: 'Analyze top 5 competitors in the project management space and create comparison matrix',
    result: 'Detailed competitive analysis with strengths, weaknesses, and pricing breakdown'
  },
  {
    title: 'Generate a business plan',
    prompt: 'Write a business plan for a B2B SaaS startup in the HR tech space',
    result: 'Executive summary, market analysis, financial projections, and go-to-market strategy'
  }
];

export default function Home() {
  const [showExamples, setShowExamples] = useState(false);
  const [selectedExample, setSelectedExample] = useState<typeof examples[0] | null>(null);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      {/* Examples Modal */}
      {showExamples && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-border-light flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-text-primary">See OneShot In Action</h3>
              <button onClick={() => setShowExamples(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selectedExample ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedExample(null)}
                    className="text-accent font-medium hover:underline mb-4"
                  >
                    ← Back to examples
                  </button>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-secondary mb-2">WHAT THE USER ASKED FOR</h4>
                      <p className="text-text-primary bg-bg-secondary p-4 rounded-lg">{selectedExample.prompt}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-secondary mb-2">WHAT ONESHOT DELIVERED</h4>
                      <p className="text-text-primary bg-bg-secondary p-4 rounded-lg">{selectedExample.result}</p>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-text-secondary mb-4">All done in seconds. No prompt engineering. No retries.</p>
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                      >
                        Try This Yourself <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {examples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedExample(example)}
                      className="text-left p-4 border border-border-light rounded-lg hover:bg-bg-secondary transition-all"
                    >
                      <h4 className="font-semibold text-text-primary mb-1">{example.title}</h4>
                      <p className="text-sm text-text-secondary">{example.prompt}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 max-w-7xl mx-auto">
        <div className="text-center space-y-6 animate-slide-in">
          <h1 className="text-5xl sm:text-6xl font-bold text-text-primary max-w-4xl mx-auto">
            Stop Prompting.
            <br />
            Start Delegating.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Describe what you want. OneShot handles the prompts, retries, quality checks, and optimization automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Try OneShot <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button
              onClick={() => setShowExamples(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-border-light text-text-primary rounded-lg font-semibold hover:bg-bg-secondary transition-all"
            >
              See Examples
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">The Problem</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-text-primary">With Most AI Products:</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1">✕</span>
                  <span>Users become prompt engineers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1">✕</span>
                  <span>Hours spent rewriting prompts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1">✕</span>
                  <span>Constant regeneration of outputs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1">✕</span>
                  <span>Burning credits on retries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1">✕</span>
                  <span>Inconsistent quality</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-text-primary">With OneShot:</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>One goal. One result.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Automatic prompt optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Self-critiquing workflows</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Multi-agent execution</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Consistent, premium results</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="space-y-6">
          {[
            { step: 1, title: 'Describe Your Goal', desc: 'Tell us what you want in plain English' },
            { step: 2, title: 'Intent Analysis', desc: 'We break down your goal into objectives' },
            { step: 3, title: 'Multi-Agent Execution', desc: 'Specialized agents handle research, writing, design' },
            { step: 4, title: 'Self-Critique', desc: 'Automatic quality checking and optimization' },
            { step: 5, title: 'Get Results', desc: 'Polished, ready-to-use deliverables' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white font-bold">
                  {item.step}
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-semibold text-text-primary">{item.title}</h4>
                <p className="text-text-secondary mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Build a landing page', icon: <Sparkles className="w-6 h-6" /> },
              { title: 'Create a marketing strategy', icon: <Brain className="w-6 h-6" /> },
              { title: 'Research competitors', icon: <Zap className="w-6 h-6" /> },
              { title: 'Generate a business plan', icon: <GitBranch className="w-6 h-6" /> },
              { title: 'Write a sales email sequence', icon: <Sparkles className="w-6 h-6" /> },
              { title: 'Design a product mockup', icon: <Brain className="w-6 h-6" /> },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setShowExamples(true)}
                className="text-left bg-white p-6 rounded-lg border border-border-light hover:shadow-md transition-all hover:border-accent"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-accent">{item.icon}</div>
                  <h3 className="font-semibold text-text-primary">{item.title}</h3>
                </div>
                <p className="text-sm text-text-secondary">Click to see an example</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Invisible Complexity', desc: 'The user never sees the internal prompts. Just results.' },
            { title: 'Premium Experience', desc: 'Calm, elegant, sophisticated interface. No startup chaos.' },
            { title: 'Trust Through Transparency', desc: 'See progress and reasoning without the prompt engineering.' },
            { title: 'Save Time', desc: 'Every feature reduces friction. Get results 10x faster.' },
            { title: 'Template Library', desc: 'Pre-built workflows for business, writing, design, and more.' },
            { title: 'Usage Analytics', desc: 'Track credits, time saved, and results completed.' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
        <p className="text-xl text-text-secondary mb-8">
          Stop prompting. Start delegating.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all text-lg"
        >
          Try OneShot Now <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
