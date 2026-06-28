'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import QuickTaskDialog from '@/components/QuickTaskDialog';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quickTaskOpen, setQuickTaskOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open quick task
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickTaskOpen(!quickTaskOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickTaskOpen]);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <QuickTaskDialog
        isOpen={quickTaskOpen}
        onClose={() => setQuickTaskOpen(false)}
      />
    </div>
  );
}
