'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    creativity: 'balanced',
    quality: 'high',
    speed: 'balanced',
    outputFormat: 'markdown',
    writingStyle: 'professional',
  });

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
        <p className="text-text-secondary">Customize your OneShot experience.</p>
      </div>

      {/* Settings Form */}
      <form className="space-y-8">
        {/* Creativity Level */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-4">
            Creativity Level
          </label>
          <div className="space-y-2">
            {[
              { value: 'conservative', label: 'Conservative', desc: 'Stick to best practices' },
              { value: 'balanced', label: 'Balanced (Default)', desc: 'Mix of creativity and reliability' },
              { value: 'creative', label: 'Creative', desc: 'More experimental ideas' },
            ].map((option) => (
              <label key={option.value} className="flex items-center p-4 border border-border-light rounded-lg hover:bg-bg-secondary cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="creativity"
                  value={option.value}
                  checked={settings.creativity === option.value}
                  onChange={(e) => handleChange('creativity', e.target.value)}
                  className="w-4 h-4"
                />
                <div className="ml-3">
                  <p className="font-medium text-text-primary">{option.label}</p>
                  <p className="text-sm text-text-secondary">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Quality Level */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-4">
            Quality Level
          </label>
          <div className="space-y-2">
            {[
              { value: 'draft', label: 'Draft', desc: 'Fast, basic outputs' },
              { value: 'standard', label: 'Standard', desc: 'Good quality, balanced speed' },
              { value: 'high', label: 'High (Default)', desc: 'Premium quality, optimized results' },
            ].map((option) => (
              <label key={option.value} className="flex items-center p-4 border border-border-light rounded-lg hover:bg-bg-secondary cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="quality"
                  value={option.value}
                  checked={settings.quality === option.value}
                  onChange={(e) => handleChange('quality', e.target.value)}
                  className="w-4 h-4"
                />
                <div className="ml-3">
                  <p className="font-medium text-text-primary">{option.label}</p>
                  <p className="text-sm text-text-secondary">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Speed vs Accuracy */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-4">
            Speed vs Accuracy
          </label>
          <div className="space-y-2">
            {[
              { value: 'fast', label: 'Speed', desc: 'Get results quickly' },
              { value: 'balanced', label: 'Balanced (Default)', desc: 'Mix of speed and accuracy' },
              { value: 'accurate', label: 'Accuracy', desc: 'Take time for best results' },
            ].map((option) => (
              <label key={option.value} className="flex items-center p-4 border border-border-light rounded-lg hover:bg-bg-secondary cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="speed"
                  value={option.value}
                  checked={settings.speed === option.value}
                  onChange={(e) => handleChange('speed', e.target.value)}
                  className="w-4 h-4"
                />
                <div className="ml-3">
                  <p className="font-medium text-text-primary">{option.label}</p>
                  <p className="text-sm text-text-secondary">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Output Format */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-3">
            Output Format
          </label>
          <select
            value={settings.outputFormat}
            onChange={(e) => handleChange('outputFormat', e.target.value)}
            className="w-full px-4 py-2 border border-border-light rounded-lg text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
            <option value="plain">Plain Text</option>
          </select>
        </div>

        {/* Writing Style */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-3">
            Preferred Writing Style
          </label>
          <select
            value={settings.writingStyle}
            onChange={(e) => handleChange('writingStyle', e.target.value)}
            className="w-full px-4 py-2 border border-border-light rounded-lg text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="professional">Professional</option>
            <option value="conversational">Conversational</option>
            <option value="casual">Casual</option>
            <option value="academic">Academic</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </form>

    </div>
  );
}
