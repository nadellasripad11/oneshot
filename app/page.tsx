'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />

      {/* Hero Section - Premium & Minimal */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Describe what you need.
                <br />
                <span className="text-accent">Get professional results.</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-lg">
                No prompt engineering. No retries. No "let me regenerate that." Just describe your goal and OneShot handles everything.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-accent text-bg-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
              >
                Try It Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/nadellasripad11/oneshot"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-border-light text-text-primary font-semibold rounded-lg hover:bg-border-light transition-all"
              >
                View Code
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border-light">
              <div>
                <div className="text-2xl font-bold text-accent">0s</div>
                <div className="text-sm text-text-secondary">Setup time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">10x</div>
                <div className="text-sm text-text-secondary">Faster than prompting</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">∞</div>
                <div className="text-sm text-text-secondary">Possibilities</div>
              </div>
            </div>
          </div>

          {/* Right: Visual - Dashboard Preview */}
          <div className="relative">
            <div className="bg-border-light rounded-lg p-1">
              <div className="bg-bg-secondary rounded-lg p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-3 bg-border-light rounded w-1/3"></div>
                  <div className="h-2 bg-border-light rounded w-full"></div>
                  <div className="h-2 bg-border-light rounded w-5/6"></div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-12 bg-accent/20 rounded"></div>
                  <div className="h-12 bg-accent/20 rounded"></div>
                  <div className="h-12 bg-accent/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: '1', title: 'Describe', desc: 'Tell OneShot what you need in plain English' },
            { num: '2', title: 'Execute', desc: 'AI handles all the work—prompts, retries, optimization' },
            { num: '3', title: 'Deliver', desc: 'Get professional results ready to use immediately' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="text-3xl font-bold text-accent">{item.num}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Can Build */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">What you can build</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            'Business plans & strategies',
            'Landing pages & websites',
            'Marketing campaigns & copy',
            'Research & competitor analysis',
            'Sales emails & sequences',
            'Product mockups & designs',
            'Code & technical docs',
            'Study guides & learning materials',
          ].map((item, idx) => (
            <div key={idx} className="p-4 border border-border-light rounded-lg hover:border-accent transition-colors">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-text-primary">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'No Setup', desc: 'Start immediately. No login, no credit card, no friction.' },
            { title: '8 Templates', desc: 'Pre-built workflows for business, design, writing, and more.' },
            { title: 'Keyboard Shortcuts', desc: 'Press Cmd+K to jump to task creation from anywhere.' },
            { title: 'Progress Tracking', desc: 'See live % progress as your task executes in real-time.' },
            { title: 'Save & Download', desc: 'Keep results saved automatically or download as files.' },
            { title: 'Customizable', desc: 'Adjust creativity, quality, speed, and output format.' },
          ].map((feature, idx) => (
            <div key={idx} className="space-y-3 pb-6 border-b border-border-light">
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 max-w-6xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Ready to stop prompting?</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Start delegating. OneShot handles the rest.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all text-lg"
          >
            Try OneShot Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
